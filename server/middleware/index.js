import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const setupMiddleware = (app, path, __dirname) => {
  app.use(
    cors({
      origin: 'https://minigames-sigma.vercel.app',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }),
  )
  app.use(express.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
}

export default setupMiddleware
