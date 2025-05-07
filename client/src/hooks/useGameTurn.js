import {useEffect, useState} from 'react'
import socket from '../utils/socket'

const useGameTurn = (roomId, onOpponent, onGameReset) => {
  const [turn, setTurn] = useState('white')
  const [playerColor, setPlayerColor] = useState(null)
  const [isMyTurn, setIsMyTurn] = useState(false)

  useEffect(() => {
    socket.on('assignColor', color => {
      setPlayerColor(color)
      setIsMyTurn(color === 'white')
    })

    socket.on('opponentMove', ({from, to}) => {
      onOpponent(from, to)
      setTurn(prev => (prev === 'white' ? 'black' : 'white'))
      setIsMyTurn(true)
    })

    socket.on('gameReset', () => {
      setTurn('white')
      setIsMyTurn(playerColor === 'white')
      onGameReset()
    })

    // socket.on('roomFull', () => {
    //   alert('The room is full. Please try joining another room')
    // })

    return () => {
      socket.off('assignColor')
      socket.off('opponentMove')
      socket.off('gameReset')
    }
  }, [onGameReset, onOpponent, playerColor])

  const emitMove = (from, to) => {
    socket.emit('makeMove', {
      roomId,
      move: {from, to},
    })
    setTurn(prev => (prev === 'white' ? 'black' : 'white'))
    setIsMyTurn(false)
  }

  const emitReset = () => {
    socket.emit('resetGame', roomId)
  }

  return {
    turn,
    playerColor,
    isMyTurn,
    emitMove,
    emitReset,
  }
}

export default useGameTurn
