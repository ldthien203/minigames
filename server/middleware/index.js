import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const setupMiddleware = (app, path, __dirname) => {
  app.use(cors())
  app.use(express.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
}

export default setupMiddleware
