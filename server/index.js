import './config/env.js'
import express from 'express'
import path from 'path'
import fs from 'fs'
import {fileURLToPath} from 'url'
import setupRoutes from './routes/index.js'
import setupSockets from './sockets/index.js'
import setupMiddleware from './middleware/index.js'
import setupUploads from './utils/setupUploads.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 4000

// Middleware
setupMiddleware(app, path, __dirname)
// Routes
setupRoutes(app)
// Socket
const httpServer = setupSockets(app)

setupUploads(fs, path, __dirname)

app.get('/', async (req, res) => {
  res.send('Welcome to the Minigames API!')
})

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
