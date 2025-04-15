const isPlayerTurn = (piece, turn) => {
  if (!piece) return false
  return turn === 'white'
    ? piece === piece.toUpperCase()
    : piece === piece.toLowerCase()
}

const isSameColor = (piece1, piece2) => {
  if (!piece1 || !piece2) return false
  const isUpper1 = piece1 === piece1.toUpperCase()
  const isUpper2 = piece2 === piece2.toUpperCase()
  return isUpper1 === isUpper2
}

const isPathClear = (piece, fromX, fromY, toX, toY, board) => {
  const stepX = toX === fromX ? 0 : (toX - fromX) / Math.abs(toX - fromX)
  const stepY = toY === fromY ? 0 : (toY - fromY) / Math.abs(toY - fromY)

  let x = fromX + stepX
  let y = fromY + stepY

  while (x !== toX || y !== toY) {
    if (board[x][y]) return false
    x += stepX
    y += stepY
  }

  return !isSameColor(piece, board[toX][toY])
}

const isValidMove = (piece, fromX, fromY, toX, toY, board) => {
  const dx = Math.abs(fromX - toX)
  const dy = Math.abs(fromY - toY)
  const target = board[toX][toY]

  switch (piece) {
    case 'P': {
      const isForwardOne = dy === 0 && toX === fromX - 1 && !board[toX][toY]

      const isForwardTwo =
        dy === 0 &&
        fromX === 6 &&
        toX === fromX - 2 &&
        !board[toX][toY] &&
        !board[fromX - 1][toY]

      const isCapture =
        dy === 1 &&
        toX === fromX - 1 &&
        board[toX][toY] &&
        board[toX][toY].toLowerCase() === board[toX][toY]

      return isForwardOne || isForwardTwo || isCapture
    }
    case 'p': {
      const isForwardOne = dy === 0 && toX === fromX + 1 && !board[toX][toY]

      const isForwardTwo =
        dy === 0 && fromX === 1 && toX === fromX + 2 && !board[toX][toY]

      const isCapture =
        dy === 1 &&
        toX === fromX + 1 &&
        board[toX][toY] &&
        board[toX][toY].toUpperCase() === board[toX][toY]

      return isForwardOne || isForwardTwo || isCapture
    }
    case 'R':
    case 'r': {
      return (
        (dx === 0 || dy === 0) &&
        isPathClear(piece, fromX, fromY, toX, toY, board)
      )
    }
    case 'N':
    case 'n': {
      const isLShape = (dx === 2 && dy === 1) || (dx === 1 && dy === 2)
      return isLShape && !isSameColor(piece, target)
    }
    case 'B':
    case 'b': {
      return dx === dy && isPathClear(piece, fromX, fromY, toX, toY, board)
    }
    case 'Q':
    case 'q':
      return (
        (dx === 0 || dy === 0 || dx === dy) &&
        isPathClear(piece, fromX, fromY, toX, toY, board)
      )
    case 'K':
    case 'k': {
      return dx <= 1 && dy <= 1 && !isSameColor(piece, target)
    }
    default:
      return false
  }
}

const getValidMoves = (x, y, piece, board) => {
  return board
    .flatMap((_, i) => board.map((_, j) => [i, j]))
    .filter(([i, j]) => isValidMove(piece, x, y, i, j, board))
}

const findKing = (board, color) => {
  const kingSymbol = color === 'white' ? 'K' : 'k'

  const positions = board.flatMap((row, i) => row.map((_, j) => [i, j]))

  return positions.find(([i, j]) => board[i][j] === kingSymbol) || null
}

const isKingInCheck = (board, color) => {
  const opponentColor = color === 'white' ? 'black' : 'white'
  const kingPos = findKing(board, color)
  if (!kingPos) return false

  const [kingX, kingY] = kingPos

  return board.some((row, x) =>
    row.some(
      (_, y) =>
        isPlayerTurn(board[x][y], opponentColor) &&
        isValidMove(board[x][y], x, y, kingX, kingY, board),
    ),
  )
}   

export {
  isPlayerTurn,
  isSameColor,
  isPathClear,
  isValidMove,
  getValidMoves,
  findKing,
  isKingInCheck,
}
