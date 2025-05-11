import {useEffect, useState} from 'react'
import {getChessSocket} from '../../utils/socket'
const chessSocket = getChessSocket()

const useChessTurn = roomId => {
  const [playerColor, setPlayerColor] = useState(null)
  const [isMyTurn, setIsMyTurn] = useState(false)

  useEffect(() => {
    chessSocket.emit('joinRoom', roomId)
    chessSocket.emit('requestColor', roomId)

    const handlePlayerJoined = () => {
      chessSocket.emit('requestColor', roomId)
    }

    const handleAssignColor = color => {
      console.log('assign color: ', color)
      setPlayerColor(color)
      setIsMyTurn(color === 'white')
    }

    const handleOpponentMove = ({from, to}) => {
      // setTurn(prev => (prev === 'white' ? 'black' : 'white'))
      setIsMyTurn(true)
    }

    chessSocket.on('playerJoined', handlePlayerJoined)
    chessSocket.on('assignColor', handleAssignColor)
    chessSocket.on('opponentMove', handleOpponentMove)

    return () => {
      chessSocket.off('playerJoined', handlePlayerJoined)
      chessSocket.off('assignColor', handleAssignColor)
      chessSocket.off('opponentMove', handleOpponentMove)
    }
  }, [playerColor, roomId])

  const emitMove = (from, to, board) => {
    chessSocket.emit('makeMove', {
      roomId,
      move: {from, to, board},
    })
    setIsMyTurn(false)
  }

  const emitReset = () => {
    chessSocket.emit('resetGame', roomId)
  }

  return {
    playerColor,
    isMyTurn,
    chessSocket,
    emitMove,
    emitReset,
  }
}

export default useChessTurn
