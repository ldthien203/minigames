import express from 'express'
import {
  fetchAllNews,
  fetchNewsById,
  fetchAllNewsType,
  fetchTrendingNews,
} from '../controllers/newsController.js'

const router = express.Router()

router.get('/', fetchAllNews)
router.get('/type', fetchAllNewsType)
router.get('/trending', fetchTrendingNews)
router.get('/:id', fetchNewsById)

export default router
