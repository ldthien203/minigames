import authRoutes from './authRoutes.js'
import gameRoutes from './gameRoutes.js'
import genreRoutes from './genreRoutes.js'
import platfromRoutes from './platformRoutes.js'
import newsRoutes from './newsRoutes.js'
import userRoutes from './userRoutes.js'
import contactRoutes from './contactRoutes.js'

const setupRoutes = app => {
  app.use('/auth', authRoutes)
  app.use('/games', gameRoutes)
  app.use('/genre', genreRoutes)
  app.use('/platform', platfromRoutes)
  app.use('/news', newsRoutes)
  app.use('/users', userRoutes)
  app.use('/send-email', contactRoutes)
}

export default setupRoutes
