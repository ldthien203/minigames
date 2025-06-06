import express from 'express'
import {
  fetchGetComments,
  fetchAddComment,
  fetchGetLatestComment,
} from '../controllers/commentController.js'

const router = express.Router()

router.get('/:type/:id', fetchGetComments)
router.post('/:type/:id', fetchAddComment)
router.get('/latest', fetchGetLatestComment)

export default router
