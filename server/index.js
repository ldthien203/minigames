import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {createServer} from 'http'
import {Server} from 'socket.io'
import gameRoutes from './routes/gameRoutes.js'
import genreRoutes from './routes/genreRoutes.js'
import platfromRoutes from './routes/platformRoutes.js'
import newsRoutes from './routes/newsRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 4000

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methodsL: ['GET', 'POST'],
  },
})

// Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// Routes
app.use('/games', gameRoutes)
app.use('/genre', genreRoutes)
app.use('/platform', platfromRoutes)
app.use('/news', newsRoutes)

app.get('/', async (req, res) => {
  res.send('Welcome to the Minigames API!')
})

io.on('connection', chessSocket => {
  console.log('A user connected to Chess namespace: ', chessSocket.id)

  chessSocket.on('joinRoom', roomId => {
    chessSocket.join(roomId)
    io.of('/chess').to(roomId).emit('playerJoined', {playerId: chessSocket.id})
  })

  chessSocket.on('makeMove', ({roomId, move}) => {
    chessSocket.to(roomId).emit('opponentMove', move)
  })

  chessSocket.on('resetGame', roomId => {
    io.of('/chess').to(roomId).emit('gameReset')
  })

  chessSocket.on('disconnect', () => {
    console.log('A user disconnected: ', chessSocket.id)
  })
})

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
