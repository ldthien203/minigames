import {useEffect, useState} from 'react'
import {initialBoard} from '../utils/chessUtils/boardUtils'
import {
  isPlayerTurn,
  isValidMove,
  getValidMoves,
  isKingInCheck,
} from '../utils/chessUtils/chessLogic'

import {io} from 'socket.io-client'

const socket = io('http://localhost:4000')

const useChess = (mode, roomId) => {
  const [gameState, setGameState] = useState({
    board: initialBoard,
    turn: 'white',
  })

  const {board, turn} = gameState
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [validMoves, setValidMoves] = useState([])

  useEffect(() => {
    socket.emit('joinRoom', roomId)

    socket.on('opponentMove', ({from, to}) => {
      const newBoard = board.map(row => [...row])
      const piece = newBoard[from[0]][from[1]]
      newBoard[from[0]][from[1]] = null
      newBoard[to[0]][to[1]] = piece

      setGameState({
        board: newBoard,
        turn: turn === 'white' ? 'black' : 'white',
      })
    })

    socket.on('gameReset', () => {
      setGameState({
        board: initialBoard,
        turn: 'white',
      })
      clearSelection()
    })

    return () => {
      socket.off('opponentMove')
      socket.off('gameReset')
    }
  }, [board, roomId, turn])

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

      setGameState({
        board: newBoard,
        turn: opponentColor,
      })
    }

    socket.emit('makeMove', {
      roomId,
      move: {from: [fromX, fromY], to: [rowIndex, colIndex]},
    })

    clearSelection()
  }

  const handleResetGame = () => {
    setGameState({
      ...gameState,
      board: initialBoard,
      turn: 'white',
    })
    socket.emit('resetGame', roomId)
  }

  return {
    board,
    turn,
    selectedSquare,
    validMoves,
    handleSquareClick,
    handleResetGame,
  }
}

export default useChess
