import express from 'express'
import {
  fetchAllGames,
  fetchGameById,
  fetchNewestReleaseGame,
} from '../controllers/gameController.js'

const router = express.Router()

router.get('/', fetchAllGames)
router.get('/newest', fetchNewestReleaseGame)
router.get('/:id', fetchGameById)

export default router
