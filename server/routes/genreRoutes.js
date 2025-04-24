import express from 'express'
import {fetchAllGenres} from '../controllers/genreController.js'

const router = express.Router()

router.get('/', fetchAllGenres)

export default router
