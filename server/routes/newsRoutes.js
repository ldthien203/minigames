import express from 'express'
import {
  fetchGetAllNews,
  fetchGetNewsById,
  fetchGetAllNewsType,
  fetchGetTrendingNews,
  fetchUpdateViewCount,
} from '../controllers/newsController.js'

const router = express.Router()

router.get('/', fetchGetAllNews)
router.get('/type', fetchGetAllNewsType)
router.get('/trending', fetchGetTrendingNews)
router.get('/:id', fetchGetNewsById)
router.post('/:id/view', fetchUpdateViewCount)

export default router
