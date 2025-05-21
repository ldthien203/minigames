import express from 'express'
import {
  fetchAllUsers,
  fetchUserById,
  updateUserById,
} from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.get('/', fetchAllUsers)
router.get('/:id', authMiddleware, fetchUserById)
router.put('/:id', authMiddleware, upload.single('avatar'), updateUserById)

export default router
