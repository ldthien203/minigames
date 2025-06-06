import express from 'express'
import {
  fetchGetComments,
  fetchAddComment,
} from '../controllers/commentController.js'

const router = express.Router()

router.get('/:type/:id', fetchGetComments)
router.post('/:type/:id', fetchAddComment)

export default router
