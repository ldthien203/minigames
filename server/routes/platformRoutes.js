import express from 'express'
import {fetchAllPlatform} from '../controllers/platformController.js'

const router = express.Router()

router.get('/', fetchAllPlatform)

export default router
