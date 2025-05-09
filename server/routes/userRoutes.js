import express from 'express'
import {
  fetchAllUsers,
  fetchUserById,
  updateUserById,
} from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', fetchAllUsers)
router.get('/:id', authMiddleware, fetchUserById)
router.put('/:id', authMiddleware, updateUserById)

export default router
