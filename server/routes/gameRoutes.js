import express from 'express'
import {
  fetchAllGames,
  fetchGameById,
  fetchNewestReleaseGame,
  fetchGamesForGames,
  fetchGamesForReview,
} from '../controllers/gameController.js'

const router = express.Router()

router.get('/', fetchAllGames)
router.get('/newest', fetchNewestReleaseGame)
router.get('/games', fetchGamesForGames)
router.get('/reviews', fetchGamesForReview)
router.get('/:id', fetchGameById)

export default router
