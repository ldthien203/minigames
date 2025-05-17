import {useEffect, useState, useRef} from 'react'
import {getChessSocket} from '../../utils/socket/socket'

const useChessTurn = roomId => {
  const [playerColor, setPlayerColor] = useState(null)
  const [isMyTurn, setIsMyTurn] = useState(false)
  const chessSocketRef = useRef(null)

  useEffect(() => {
    chessSocketRef.current = getChessSocket()
    const chessSocket = chessSocketRef.current

    chessSocket.emit('joinRoom', roomId)

    const handleAssignColor = color => {
      console.log('Assigned color: ', color)
      setPlayerColor(color)
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
  }, [roomId])

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
    chessSocket: chessSocketRef.current,
    emitMove,
    emitReset,
  }
}

export default useChessTurn
