import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import gameRoutes from './routes/gameRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// Routes
app.use('/games', gameRoutes)

app.get('/', async (req, res) => {
  res.send('Welcome to the Minigames API!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
