import {useState} from 'react'
import {initialBoard} from '../utils/chessUtils/boardUtils'
import {
  isPlayerTurn,
  isValidMove,
  getValidMoves,
  isKingInCheck,
} from '../utils/chessUtils/chessLogic'

const useChess = ({turn, onMove}) => {
  const [board, setBoard] = useState(initialBoard)
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [validMoves, setValidMoves] = useState([])

  const clearSelection = () => {
    setSelectedSquare(null)
    setValidMoves([])
  }

  const handleSquareClick = (row, col) => {
    const piece = board[row][col]

    // If not selected then select
    if (!selectedSquare) {
      if (piece && isPlayerTurn(piece, turn)) {
        setSelectedSquare([row, col])
        setValidMoves(getValidMoves(row, col, piece, board))
      }
      return
    }

    // If selected piece
    const [fromX, fromY] = selectedSquare
    const selectedPiece = board[fromX][fromY]

    if (row === fromX && col === fromY) {
      clearSelection()
      return
    }

    if (isValidMove(selectedPiece, fromX, fromY, row, col, board)) {
      const newBoard = board.map(row => [...row])
      newBoard[row][col] = selectedPiece
      newBoard[fromX][fromY] = null

      const opponentColor = turn === 'white' ? 'black' : 'white'
      if (isKingInCheck(newBoard, opponentColor)) {
        console.log(`${opponentColor} king is in check`)
      }
      setBoard(newBoard)
      clearSelection()
      onMove({from: [fromX, fromY], to: [row, col], board: newBoard})
    }

    clearSelection()
  }

  const resetBoard = () => {
    setBoard(initialBoard)
    clearSelection()
  }

  return {
    board,
    setBoard,
    selectedSquare,
    validMoves,
    handleSquareClick,
    resetBoard,
  }
}

export default useChess
