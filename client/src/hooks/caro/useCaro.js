import {useState} from 'react'
import {WIN_CONDITION} from '../../utils/constants'

const useCaro = () => {
  const [boardSize, setBoardSize] = useState(3)
  const [board, setBoard] = useState(Array(3 * 3).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState(null)

  const calculateWinner = board => {
    const currentWinCondition = Math.min(boardSize, WIN_CONDITION)

    const checkDirection = (x, y, dx, dy) => {
      const player = board[x * boardSize + y]
      if (!player) return null

      for (let i = 1; i < currentWinCondition; i++) {
        const newX = x + i * dx
        const newY = y + i * dy

        if (
          newX < 0 ||
          newX >= boardSize ||
          newY < 0 ||
          newY >= boardSize ||
          board[newX * boardSize + newY] !== player
        ) {
          return null
        }
      }
      return player
    }

    for (let x = 0; x < boardSize; x++) {
      for (let y = 0; y < boardSize; y++) {
        if (board[x * boardSize + y]) {
          if (
            checkDirection(x, y, 0, 1) || // Ngang →
            checkDirection(x, y, 1, 0) || // Dọc ↓
            checkDirection(x, y, 1, 1) || // Chéo ↘
            checkDirection(x, y, 1, -1) // Chéo ↗
          ) {
            return board[x * boardSize + y]
          }
        }
      }
    }
    return null
  }

  const handleClick = (index, symbol = isXNext ? 'X' : 'O') => {
    if (board[index] || calculateWinner(board) || winner) return
    const newBoard = [...board]
    newBoard[index] = symbol
    setBoard(newBoard)
    setIsXNext(symbol !== 'X')
  }

  const resetGame = () => {
    setBoard(Array(boardSize * boardSize).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

  const updateBoardSize = size => {
    const newSize = parseInt(size)
    if (newSize >= 3 && newSize <= 14) {
      setBoardSize(newSize)
      setBoard(Array(newSize * newSize).fill(null))
      setWinner(null)
    }
  }

  return {
    board,
    setBoard,
    isXNext,
    setIsXNext,
    handleClick,
    winner,
    resetGame,
    boardSize,
    setBoardSize,
    updateBoardSize,
  }
}

export default useCaro
