import express from 'express'
import {fetchAllGames, fetchGameById} from '../controllers/gameController.js'

const router = express.Router()

router.get('/', fetchAllGames)
router.get('/:id', fetchGameById)

export default router
