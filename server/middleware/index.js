import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const setupMiddleware = (app, path, __dirname) => {
  app.use(
    cors({
<<<<<<< HEAD
      origin: 'https://minigames-sigma.vercel.app',
=======
      origin: 'https://minigames-deploy.vercel.app/',
>>>>>>> 8c179ab0e066eaa028ccd9dd75db7f205138abcc
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }),
  )
  app.use(express.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
}

export default setupMiddleware
