import {useEffect, useState} from 'react'
import {
  initialBoard,
  isPlayerTurn,
  getValidMoves,
  checkKingStatus,
  getAllValidMovesWhenChecked,
  isCheckmate,
} from '../../utils/chessUtils'

const useChess = (playerColor = 'white', onMove) => {
  const [board, setBoard] = useState(initialBoard)
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [validMoves, setValidMoves] = useState([])
  const [escapeMoves, setEscapeMoves] = useState([])
  const [kingInCheck, setKingInCheck] = useState(null)
  const [checkmate, setCheckmate] = useState(null)
  const [winner, setWinner] = useState(null)

  useEffect(() => {
    const kingWhiteInCheck = checkKingStatus(board, 'white')
    const kingBlackInCheck = checkKingStatus(board, 'black')

    if (kingWhiteInCheck) {
      setKingInCheck({position: kingWhiteInCheck, color: 'white'})

      const validsEscape = getAllValidMovesWhenChecked(board, 'white')
      setEscapeMoves(validsEscape)

      if (validsEscape.length === 0) {
        if (isCheckmate(board, 'white')) {
          setCheckmate('black')
          setWinner('black')
        }
      } else {
        setValidMoves(validsEscape)
        setCheckmate(null)
      }
    } else if (kingBlackInCheck) {
      setKingInCheck({position: kingBlackInCheck, color: 'black'})

      const validsEscape = getAllValidMovesWhenChecked(board, 'black') || 1
      setEscapeMoves(validsEscape)

      if (validsEscape.length === 0) {
        if (isCheckmate(board, 'black')) {
          setCheckmate('white')
          setWinner('white')
        }
      } else {
        setCheckmate(null)
      }
    } else {
      setKingInCheck(null)
      setCheckmate(null)
      setValidMoves([])
    }

    setValidMoves([])
  }, [board])

  const clearSelection = () => {
    setSelectedSquare(null)
    setValidMoves([])
  }

  const handleSquareClick = (row, col, color) => {
    const piece = board[row][col]

    if (!selectedSquare) {
      if (piece && isPlayerTurn(piece, color)) {
        setSelectedSquare([row, col])

        if (kingInCheck?.color === color) {
          const movesFromPiece = escapeMoves
            .filter(([fromX, fromY]) => fromX === row && fromY === col)
            .map(([_, __, toX, toY]) => [toX, toY])
          setValidMoves(movesFromPiece)
        } else {
          setValidMoves(getValidMoves(row, col, piece, board))
        }
      }
      return
    }

    const [fromX, fromY] = selectedSquare
    const selectedPiece = board[fromX][fromY]

    if (row === fromX && col === fromY) {
      clearSelection()
      return
    }

    const isLegalMove = validMoves.some(
      ([toX, toY]) => toX === row && toY === col,
    )

    if (isLegalMove) {
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
    setEscapeMoves([])
    clearSelection()
  }

  return {
    board,
    setBoard,
    selectedSquare,
    validMoves,
    kingInCheck,
    setKingInCheck,
    handleSquareClick,
    checkmate,
    winner,
    resetBoard,
    checkKingStatus,
  }
}

export default useChess
