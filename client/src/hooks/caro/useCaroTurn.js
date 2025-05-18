import {useEffect, useRef, useState} from 'react'
import {getCaroSocket} from '../../utils/socket/socket'
import useAuth from '../../hooks/useAuth'

const useCaroTurn = roomId => {
  const [playerSymbol, setPlayerSymbol] = useState(null)
  const [isMyTurn, setIsMyTurn] = useState(false)
  const caroSocketRef = useRef(null)
  const {user} = useAuth()
  const [caroUser, setCaroUser] = useState(null)

  useEffect(() => {
    caroSocketRef.current = getCaroSocket()
    const caroSocket = caroSocketRef.current

    user && caroSocket.emit('joinRoom', {roomId, user: user.username})

    const handleAssignSymbol = ({symbol, yourUser, opponent}) => {
      console.log('Assigned symbol: ', symbol)
      setPlayerSymbol(symbol)
      setCaroUser({yourUser, opponent})
      setIsMyTurn(symbol === 'X')
    }

    const handleOpponentMove = () => {
      setIsMyTurn(true)
    }

    caroSocket.on('assignSymbol', handleAssignSymbol)
    caroSocket.on('opponentMove', handleOpponentMove)

    return () => {
      caroSocket.off('assignSymbol', handleAssignSymbol)
      caroSocket.off('opponentMove', handleOpponentMove)
      // caroSocket.disconnect()
    }
  }, [roomId, user])

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
    caroUser,
  }
}

export default useCaroTurn
