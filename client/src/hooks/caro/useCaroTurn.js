import {useEffect, useState} from 'react'
import {getCaroSocket} from '../../utils/socket'
const caroSocket = getCaroSocket()

const useCaroTurn = roomId => {
  const [playerSymbol, setPlayerSymbol] = useState(null)
  const [isMyTurn, setIsMyTurn] = useState(false)

  useEffect(() => {
    caroSocket.emit('joinRoom', roomId)
    caroSocket.emit('requestSymbol', roomId)

    const handlePlayerJoined = () => {
      caroSocket.emit('requestSymbol', roomId)
    }

    const handleAssignSymbol = symbol => {
      setPlayerSymbol(symbol)
      setIsMyTurn(symbol === 'X')
    }

    const handleOpponentMove = () => {
      setIsMyTurn(true)
    }

    caroSocket.on('playerJoined', handlePlayerJoined)
    caroSocket.on('assignSymbol', handleAssignSymbol)
    caroSocket.on('opponentMove', handleOpponentMove)

    return () => {
      caroSocket.off('playerJoined', handlePlayerJoined)
      caroSocket.off('assignSymbol', handleAssignSymbol)
      caroSocket.off('opponentMove', handleOpponentMove)
    }
  }, [roomId])

  const emitMove = index => {
    caroSocket.emit('makeMove', {roomId, move: index})
    setIsMyTurn(false)
  }

  const emitReset = () => {
    caroSocket.emit('resetGame', roomId)
  }

  return {
    playerSymbol,
    isMyTurn,
    emitMove,
    emitReset,
    caroSocket,
  }
}

export default useCaroTurn
