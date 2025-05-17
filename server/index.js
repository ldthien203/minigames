import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import './config/config.js'
import {createServer} from 'http'
import {Server} from 'socket.io'
import authRoutes from './routes/authRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import genreRoutes from './routes/genreRoutes.js'
import platfromRoutes from './routes/platformRoutes.js'
import newsRoutes from './routes/newsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import chessSocket from './sockets/chessSocket.js'
import caroSocket from './sockets/caroSocket.js'

const app = express()
const port = process.env.PORT || 4000

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
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

chessSocket(io)
caroSocket(io)

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
