import {useEffect} from 'react'
import socket from '../utils/socket.js'

const useWebSocket = roomId => {
  useEffect(() => {
    socket.emit('joinRoom', roomId)

    return () => {
      socket.emit('leaveRoom', roomId)
    }
  }, [roomId])
}

export default useWebSocket
