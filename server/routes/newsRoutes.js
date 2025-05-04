import express from 'express'
import {
  fetchAllNews,
  fetchNewsById,
  fetchAllNewsType,
} from '../controllers/newsController.js'

const router = express.Router()

router.get('/', fetchAllNews)
router.get('/type', fetchAllNewsType)
router.get('/:id', fetchNewsById)

export default router
