import {useEffect, useRef, useState} from 'react'
import {getCaroSocket} from '../../utils/socket/socket'

const useCaroTurn = roomId => {
  const [playerSymbol, setPlayerSymbol] = useState(null)
  const [isMyTurn, setIsMyTurn] = useState(false)
  const caroSocketRef = useRef(null)

  useEffect(() => {
    caroSocketRef.current = getCaroSocket()
    const caroSocket = caroSocketRef.current

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
    caroSocketRef.current.emit('makeMove', {roomId, move: index})
    setIsMyTurn(false)
  }

  const emitReset = () => {
    caroSocketRef.current.emit('resetGame', roomId)
  }

  return {
    playerSymbol,
    isMyTurn,
    caroSocket: caroSocketRef.current,
    emitMove,
    emitReset,
  }
}

export default useCaroTurn
