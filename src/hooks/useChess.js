import {useState} from 'react'
import {initialBoard} from '../utils/chessUtils/boardUtils'
import {
  isPlayerTurn,
  isValidMove,
  getValidMoves,
  isKingInCheck,
} from '../utils/chessUtils/chessLogic'

const useChess = () => {
  const [board, setBoard] = useState(initialBoard)
  const [turn, setTurn] = useState('white')
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [validMoves, setValidMoves] = useState([])

  const clearSelection = () => {
    setSelectedSquare(null)
    setValidMoves([])
  }

  const handleSquareClick = (rowIndex, colIndex) => {
    const clickedPiece = board[rowIndex][colIndex]

    // If not selected then select
    if (!selectedSquare) {
      if (clickedPiece && isPlayerTurn(clickedPiece, turn)) {
        setSelectedSquare([rowIndex, colIndex])
        const moves = getValidMoves(rowIndex, colIndex, clickedPiece, board)
        setValidMoves(moves)
      }
      return
    }

    // If selected piece
    const [fromX, fromY] = selectedSquare
    const piece = board[fromX][fromY]

    if (rowIndex === fromX && colIndex === fromY) {
      clearSelection()
      return
    }

    if (isValidMove(piece, fromX, fromY, rowIndex, colIndex, board)) {
      const newBoard = board.map(row => [...row])
      newBoard[rowIndex][colIndex] = piece
      newBoard[fromX][fromY] = null

      const opponentColor = turn === 'white' ? 'black' : 'white'
      if (isKingInCheck(newBoard, opponentColor)) {
        console.log(`${opponentColor} king is in check`)
      }

      setBoard(newBoard)
      setTurn(prev => (prev === 'white' ? 'black' : 'white'))
    }

    clearSelection()
  }

  return {
    board,
    setBoard,
    turn,
    setTurn,
    selectedSquare,
    handleSquareClick,
    validMoves,
  }
}

export default useChess
