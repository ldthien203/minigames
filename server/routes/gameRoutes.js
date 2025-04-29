import express from 'express'
import {
  fetchAllGames,
  fetchGameById,
  fetchNewestReleaseGame,
  fetchGamesForGames,
} from '../controllers/gameController.js'

const router = express.Router()

router.get('/', fetchAllGames)
router.get('/newest', fetchNewestReleaseGame)
router.get('/games', fetchGamesForGames)
router.get('/:id', fetchGameById)

export default router
