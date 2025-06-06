import authRoutes from './authRoutes.js'
import gameRoutes from './gameRoutes.js'
import genreRoutes from './genreRoutes.js'
import platfromRoutes from './platformRoutes.js'
import newsRoutes from './newsRoutes.js'
import userRoutes from './userRoutes.js'
import contactRoutes from './contactRoutes.js'
import commentRoutes from './commentRoutes.js'

const setupRoutes = app => {
  app.use('/auth', authRoutes)
  app.use('/games', gameRoutes)
  app.use('/genre', genreRoutes)
  app.use('/platform', platfromRoutes)
  app.use('/news', newsRoutes)
  app.use('/users', userRoutes)
  app.use('/send-email', contactRoutes)
  app.use('/comment', commentRoutes)
}

export default setupRoutes
