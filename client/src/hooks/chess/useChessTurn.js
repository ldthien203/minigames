import {useEffect, useState, useRef} from 'react'
import {getChessSocket} from '../../utils/socket/socket'
import useAuth from '../useAuth'

const useChessTurn = roomId => {
  const [playerColor, setPlayerColor] = useState(null)
  const [isMyTurn, setIsMyTurn] = useState(false)
  const chessSocketRef = useRef(null)
  const {user} = useAuth()
  const [chessUser, setChessUser] = useState(null)

  useEffect(() => {
    chessSocketRef.current = getChessSocket()
    const chessSocket = chessSocketRef.current

    user && chessSocket.emit('joinRoom', {roomId, user: user.username})

    const handleAssignColor = ({color, yourUser, opponent}) => {
      console.log('Assigned color: ', color)
      setPlayerColor(color)
      setChessUser({yourUser, opponent})
      setIsMyTurn(color === 'white')
    }

    const handleOpponentMove = ({from, to}) => {
      setIsMyTurn(true)
    }

    chessSocket.on('assignColor', handleAssignColor)
    chessSocket.on('opponentMove', handleOpponentMove)

    return () => {
      chessSocket.off('assignColor', handleAssignColor)
      chessSocket.off('opponentMove', handleOpponentMove)
    }
  }, [roomId, user])

  const emitMove = (from, to, board) => {
    chessSocketRef.current.emit('makeMove', {
      roomId,
      move: {from, to, board},
    })
    setIsMyTurn(false)
  }

  const emitReset = () => {
    chessSocketRef.current.emit('resetGame', roomId)
  }

  return {
    playerColor,
    isMyTurn,
    chessUser,
    currentUser: user,
    chessSocket: chessSocketRef.current,
    emitMove,
    emitReset,
  }
}

export default useChessTurn
