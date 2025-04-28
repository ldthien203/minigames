import express from 'express'
import {fetchAllNews} from '../controllers/newsController.js'

const router = express.Router()

router.get('/', fetchAllNews)

export default router
