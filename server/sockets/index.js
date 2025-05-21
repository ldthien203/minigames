import {createServer} from 'http'
import {Server} from 'socket.io'
import chessSocket from './chessSocket.js'
import caroSocket from './caroSocket.js'

const setupSockets = app => {
  const httpServer = createServer(app)
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  chessSocket(io)
  caroSocket(io)

  return httpServer
}

export default setupSockets
