import {isSameColor} from './gameStatus'

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

const isPawnMoveValid = (piece, fromX, fromY, toX, toY, board) => {
  const direction = piece === 'P' ? -1 : 1
  const startRow = piece === 'P' ? 6 : 1

  const deltaRow = toX - fromX
  const deltaCol = Math.abs(toY - fromY)

  const targetPiece = board[toX][toY]
  const isEmpty = !targetPiece

  const isForwardOne = deltaRow === direction && deltaCol === 0 && isEmpty

  const isForwardTwo =
    fromX === startRow &&
    deltaRow === 2 * direction &&
    deltaCol === 0 &&
    isEmpty &&
    !board[fromX + direction][toY]

  const isCapture =
    deltaRow === direction &&
    deltaCol === 1 &&
    targetPiece &&
    !isSameColor(piece, targetPiece)

  return isForwardOne || isForwardTwo || isCapture
}

const isKnightMoveValid = (piece, fromX, fromY, toX, toY, board) => {
  const dx = Math.abs(fromX - toX)
  const dy = Math.abs(fromY - toY)
  const isLShape = (dx === 2 && dy === 1) || (dx === 1 && dy === 2)
  return isLShape && !isSameColor(piece, board[toX][toY])
}

const isRookMoveValid = (piece, fromX, fromY, toX, toY, board) => {
  const dx = Math.abs(fromX - toX)
  const dy = Math.abs(fromY - toY)
  return (
    (dx === 0 || dy === 0) && isPathClear(piece, fromX, fromY, toX, toY, board)
  )
}

const isBishopMoveValid = (piece, fromX, fromY, toX, toY, board) => {
  const dx = Math.abs(fromX - toX)
  const dy = Math.abs(fromY - toY)
  return dx === dy && isPathClear(piece, fromX, fromY, toX, toY, board)
}

const isQueenMoveValid = (piece, fromX, fromY, toX, toY, board) => {
  const dx = Math.abs(fromX - toX)
  const dy = Math.abs(fromY - toY)
  return (
    (dx === 0 || dy === 0 || dx === dy) &&
    isPathClear(piece, fromX, fromY, toX, toY, board)
  )
}

const isKingMoveValid = (piece, fromX, fromY, toX, toY, board) => {
  const dx = Math.abs(fromX - toX)
  const dy = Math.abs(fromY - toY)
  return dx <= 1 && dy <= 1 && !isSameColor(piece, board[toX][toY])
}

const moveValidators = new Map([
  ['P', isPawnMoveValid],
  ['p', isPawnMoveValid],
  ['R', isRookMoveValid],
  ['r', isRookMoveValid],
  ['N', isKnightMoveValid],
  ['n', isKnightMoveValid],
  ['B', isBishopMoveValid],
  ['b', isBishopMoveValid],
  ['Q', isQueenMoveValid],
  ['q', isQueenMoveValid],
  ['K', isKingMoveValid],
  ['k', isKingMoveValid],
])

const isValidMove = (piece, fromX, fromY, toX, toY, board) => {
  const validator = moveValidators.get(piece)
  return validator ? validator(piece, fromX, fromY, toX, toY, board) : false
}

const getValidMoves = (x, y, piece, board) => {
  return board
    .flatMap((_, i) => board.map((_, j) => [i, j]))
    .filter(([i, j]) => isValidMove(piece, x, y, i, j, board))
}

const simulateMove = (board, fromX, fromY, toX, toY) => {
  const newBoard = board.map(row => [...row])
  console.log(newBoard)

  if (toX < 0 || toY < 0 || toX >= board.length || toY >= board[0].length) {
    throw new Error(
      `Invalid move: target position (${toX}, ${toY}) is out of bounds.`,
    )
  }

  if (!newBoard[toX]) {
    throw new Error(`Invalid move: target row ${toX} is out of bounds.`)
  }
  newBoard[toX][toY] = newBoard[fromX][fromY]
  newBoard[fromX][fromY] = null

  return newBoard
}

export {isPathClear, isValidMove, getValidMoves, simulateMove}
