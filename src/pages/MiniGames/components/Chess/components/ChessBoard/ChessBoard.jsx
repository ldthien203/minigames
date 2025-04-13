import {useState} from 'react'
import './ChessBoard.css'
import pieceMap from '../../../../../../assets/img/chess/piece'

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]

const getPieceImg = piece => {
  return pieceMap[piece] || null
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
        dx === 0 ||
        dy === 0 ||
        (dx === dy && isPathClear(piece, fromX, fromY, toX, toY, board))
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
  const moves = []

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMove(piece, x, y, i, j, board)) {
        moves.push([i, j])
      }
    }
  }

  return moves
}

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoard)
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [validMoves, setValidMoves] = useState([])

  const handleSquareClick = (rowIndex, colIndex) => {
    const clickedPiece = board[rowIndex][colIndex]

    if (!selectedSquare) {
      if (clickedPiece) {
        setSelectedSquare([rowIndex, colIndex])
        const moves = getValidMoves(rowIndex, colIndex, clickedPiece, board)
        setValidMoves(moves)
      }
      return
    }

    const [fromX, fromY] = selectedSquare
    const piece = board[fromX][fromY]

    const isMoveValid = isValidMove(
      piece,
      fromX,
      fromY,
      rowIndex,
      colIndex,
      board,
    )

    if (isMoveValid) {
      const newBoard = board.map(row => [...row])
      newBoard[rowIndex][colIndex] = piece
      newBoard[fromX][fromY] = null
      setBoard(newBoard)
    }

    setSelectedSquare(null)
    setValidMoves([])
  }

  return (
    <div className="chess-board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isWhite = (rowIndex + colIndex) % 2 === 0
          const isSelected =
            selectedSquare &&
            selectedSquare[0] === rowIndex &&
            selectedSquare[1] === colIndex
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`square ${isWhite ? 'white' : 'black'} ${
                isSelected ? 'selected' : ''
              }`}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
              {cell && (
                <img src={getPieceImg(cell)} alt={cell} className="piece" />
              )}
              {validMoves.some(
                ([x, y]) => x === rowIndex && y === colIndex,
              ) && <div className="move-dot" />}
            </div>
          )
        }),
      )}
    </div>
  )
}

export default ChessBoard
