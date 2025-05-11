import {useState} from 'react'
import {initialBoard} from '../../utils/chessUtils/boardUtils'
import {
  isPlayerTurn,
  isValidMove,
  getValidMoves,
  isKingInCheck,
  findKing,
} from '../../utils/chessUtils/chessLogic'

const useChess = onMove => {
  const [board, setBoard] = useState(initialBoard)
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [validMoves, setValidMoves] = useState([])
  const [kingInCheck, setKingInCheck] = useState(null)

  const clearSelection = () => {
    setSelectedSquare(null)
    setValidMoves([])
  }

  const handleSquareClick = (row, col, color) => {
    const piece = board[row][col]

    // If not selected then select
    if (!selectedSquare) {
      if (piece && isPlayerTurn(piece, color)) {
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

      const opponentColor = color === 'white' ? 'black' : 'white'
      const kingPosition = findKing(newBoard, opponentColor)

      if (!kingPosition) {
        alert(`${opponentColor} has lost!`)
        resetBoard()
        return
      }

      if (isKingInCheck(newBoard, opponentColor)) {
        console.log(`${opponentColor} king is in check`)
        setKingInCheck(kingPosition)
      } else {
        setKingInCheck(null)
      }

      setBoard(newBoard)
      clearSelection()
      if (onMove)
        onMove({from: [fromX, fromY], to: [row, col], board: newBoard})
      return
    }

    clearSelection()
  }

  const resetBoard = () => {
    setBoard(initialBoard)
    clearSelection()
    setKingInCheck(null)
  }

  return {
    board,
    setBoard,
    selectedSquare,
    validMoves,
    kingInCheck,
    handleSquareClick,
    resetBoard,
  }
}

export default useChess
