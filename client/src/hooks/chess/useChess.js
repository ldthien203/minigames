import {useEffect, useState} from 'react'
import {initialBoard} from '../../utils/chessUtils/boardInit'
import {
  isPlayerTurn,
  isValidMove,
  getValidMoves,
  checkKingStatus,
} from '../../utils/chessUtils/chessLogic'

const useChess = (playerColor, onMove) => {
  const [board, setBoard] = useState(initialBoard)
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [validMoves, setValidMoves] = useState([])
  const [kingInCheck, setKingInCheck] = useState(null)
  const [winner, setWinner] = useState(null)

  const clearSelection = () => {
    setSelectedSquare(null)
    setValidMoves([])
  }

  const handleSquareClick = (row, col, color) => {
    const piece = board[row][col]

    if (!selectedSquare) {
      if (piece && isPlayerTurn(piece, color)) {
        setSelectedSquare([row, col])
        setValidMoves(getValidMoves(row, col, piece, board))
      }
      return
    }

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
    setKingInCheck(null)
    setWinner(null)
    clearSelection()
  }

  // const updateKingCheckStatus = (board, currentColor) => {
  //   const opponentColor = currentColor === 'white' ? 'black' : 'white'
  //   const isInCheck = checkKingStatus(board, opponentColor)
  //   setKingInCheck(isInCheck)
  // }

  useEffect(() => {
    if (!playerColor) return
    const opponentColor = playerColor === 'white' ? 'black' : 'white'

    const myKingCheck = checkKingStatus(board, playerColor)
    const opponentKingCheck = checkKingStatus(board, opponentColor)

    if (myKingCheck) setKingInCheck(myKingCheck)
    else if (opponentKingCheck) setKingInCheck(opponentKingCheck)
    else setKingInCheck(null)
  }, [board, playerColor])

  return {
    board,
    setBoard,
    selectedSquare,
    validMoves,
    kingInCheck,
    setKingInCheck,
    handleSquareClick,
    winner,
    resetBoard,
    checkKingStatus,
  }
}

export default useChess
