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

const rooms = {}

io.on('connection', socket => {
  console.log('A user connected to Chess namespace: ', socket.id)

  socket.on('joinRoom', roomId => {
    socket.join(roomId)

    if (!rooms[roomId]) {
      rooms[roomId] = []
    }

    if (rooms[roomId].length < 2) {
      rooms[roomId].push(socket.id)
      const color = rooms[roomId].length === 1 ? 'white' : 'black'

      socket.emit('assignColor', color)
      io.of('/chess').to(roomId).emit('playerJoined', {playerId: socket.id})
    } else {
      io.emit('roomFull')
    }
  })

  socket.on('makeMove', ({roomId, move}) => {
    socket.to(roomId).emit('opponentMove', move)
  })

  socket.on('resetGame', roomId => {
    io.of('/chess').to(roomId).emit('gameReset')
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected: ', socket.id)
  })
})

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
