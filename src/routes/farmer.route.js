import express from 'express'
import FarmerController from '../controllers/farmer.controller.js'
import authorizeMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', FarmerController.createFarmer)
router.post('/login', FarmerController.loginFarmer)
router.put('/updatePassword', FarmerController.updatePassword)

router.use(authorizeMiddleware)

router.put('/updateFarmer', FarmerController.updateFarmer)
router.delete('/:id', FarmerController.deleteFarmer)
router.get('/', FarmerController.getFarmers)
router.get('/:id', FarmerController.getFarmer)

export default router
