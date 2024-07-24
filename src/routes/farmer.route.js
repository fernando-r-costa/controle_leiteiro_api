import express from 'express'
import FarmerController from '../controllers/farmer.controller.js'
import authorizeMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', FarmerController.createFarmer)
router.post('/login', FarmerController.loginFarmer)

router.use(authorizeMiddleware)

router.put('/', FarmerController.updateFarmer)
router.delete('/:id', FarmerController.deleteFarmer)
router.get('/', FarmerController.getFarmers)
router.get('/:id', FarmerController.getFarmer)

export default router
