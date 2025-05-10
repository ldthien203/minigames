import {useEffect, useState} from 'react'
import {getChessSocket} from '../utils/socket'
const chessSocket = getChessSocket()

const useChessTurn = (roomId, onOpponent, onGameReset) => {
  const [turn, setTurn] = useState('white')
  const [playerColor, setPlayerColor] = useState(null)
  const [isMyTurn, setIsMyTurn] = useState(false)

  useEffect(() => {
    chessSocket.emit('joinRoom', roomId)

    chessSocket.on('assignColor', color => {
      setPlayerColor(color)
      setIsMyTurn(color === 'white')
    })

    chessSocket.on('opponentMove', ({from, to}) => {
      onOpponent(from, to)
      setTurn(prev => (prev === 'white' ? 'black' : 'white'))
      setIsMyTurn(true)
    })

    chessSocket.on('gameReset', () => {
      setTurn('white')
      setIsMyTurn(playerColor === 'white')
      onGameReset()
    })

    // chessSocket.on('roomFull', () => {
    //   alert('The room is full. Please try joining another room')
    // })

    return () => {
      chessSocket.off('assignColor')
      chessSocket.off('opponentMove')
      chessSocket.off('gameReset')
      chessSocket.emit('leaveRoom', roomId)
    }
  }, [onGameReset, onOpponent, playerColor, roomId])

  const emitMove = (from, to) => {
    chessSocket.emit('makeMove', {
      roomId,
      move: {from, to},
    })
    setTurn(prev => (prev === 'white' ? 'black' : 'white'))
    setIsMyTurn(false)
  }

  const emitReset = () => {
    chessSocket.emit('resetGame', roomId)
  }

  return {
    turn,
    playerColor,
    isMyTurn,
    emitMove,
    emitReset,
  }
}

export default useChessTurn
