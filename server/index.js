import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {createServer} from 'http'
import {Server} from 'socket.io'
import authRoutes from './routes/authRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import genreRoutes from './routes/genreRoutes.js'
import platfromRoutes from './routes/platformRoutes.js'
import newsRoutes from './routes/newsRoutes.js'
import userRoutes from './routes/userRoutes.js'
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
app.use('/auth', authRoutes)
app.use('/games', gameRoutes)
app.use('/genre', genreRoutes)
app.use('/platform', platfromRoutes)
app.use('/news', newsRoutes)
app.use('/users', userRoutes)

app.get('/', async (req, res) => {
  res.send('Welcome to the Minigames API!')
})

const chessRooms = {}

io.of('/chess').on('connection', socket => {
  console.log('A user connected to Chess namespace: ', socket.id)

  socket.on('joinRoom', roomId => {
    socket.join(roomId)

    if (!chessRooms[roomId]) chessRooms[roomId] = []
    if (!chessRooms[roomId].includes(socket.id)) {
      chessRooms[roomId].push(socket.id)
      socket.to(roomId).emit('playerJoined', {playerId: socket.id})
    }
  })

  socket.on('requestColor', roomId => {
    const players = chessRooms[roomId] || []
    let color = 'black'
    if (players[0] === socket.id) color = 'white'
    socket.emit('assignColor', color)
  })

  socket.on('makeMove', ({roomId, move}) => {
    socket.to(roomId).emit('opponentMove', move)
  })

  socket.on('resetGame', roomId => {
    io.of('/chess').to(roomId).emit('gameReset')
  })

  socket.on('disconnect', () => {
    for (const roomId in chessRooms) {
      chessRooms[roomId] = chessRooms[roomId].filter(id => id !== socket.id)
      if (chessRooms[roomId].length === 0) delete chessRooms[roomId]
    }

    console.log('A user disconnected from Chess: ', socket.id)
  })
})

const caroRooms = {}

io.of('/caro').on('connection', socket => {
  console.log('A user connected to Caro namespace: ', socket.id)

  socket.on('joinRoom', roomId => {
    socket.join(roomId)
    if (!caroRooms[roomId]) caroRooms[roomId] = []
    if (!caroRooms[roomId].includes(socket.id)) {
      caroRooms[roomId].push(socket.id)
    }
    socket.to(roomId).emit('playerJoined', {playerId: socket.id})
  })

  socket.on('requestSymbol', roomId => {
    const players = caroRooms[roomId] || []
    let symbol = 'O'
    if (players[0] === socket.id) symbol = 'X'
    socket.emit('assignSymbol', symbol)
  })

  socket.on('makeMove', ({roomId, move}) => {
    socket.to(roomId).emit('opponentMove', move)
  })

  socket.on('resetGame', roomId => {
    io.of('/caro').to(roomId).emit('gameReset')
  })

  socket.on('disconnect', () => {
    for (const roomId in caroRooms) {
      caroRooms[roomId] = caroRooms[roomId].filter(id => id !== socket.id)
      if (caroRooms[roomId].length === 0) delete caroRooms[roomId]
    }
    console.log('A user disconnected from Caro: ', socket.id)
  })
})

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
