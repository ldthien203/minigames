import express from 'express'
import {fetchAllCategories} from '../controllers/categoryController.js'

const router = express.Router()

router.get('/', fetchAllCategories)

export default router
