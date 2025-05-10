import express from 'express'
import {
  fetchAllNews,
  fetchNewsById,
  fetchAllNewsType,
  fetchTrendingNews,
  fetchLatestComment,
} from '../controllers/newsController.js'

const router = express.Router()

router.get('/', fetchAllNews)
router.get('/type', fetchAllNewsType)
router.get('/trending', fetchTrendingNews)
router.get('/latest', fetchLatestComment)
router.get('/:id', fetchNewsById)

export default router
