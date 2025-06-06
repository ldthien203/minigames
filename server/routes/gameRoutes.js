import express from 'express'
import {
  fetchGetAllGames,
  fetchGetGameById,
  fetchGetNewestReleaseGame,
} from '../controllers/gameController.js'

const router = express.Router()

router.get('/', fetchGetAllGames)
router.get('/newest', fetchGetNewestReleaseGame)
router.get('/:id', fetchGetGameById)

export default router
