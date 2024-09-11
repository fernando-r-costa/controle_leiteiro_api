import express from 'express'
import FarmerController from '../controllers/farmer.controller.js'
import auth from '../middlewares/auth.middleware.js'
import role from '../middlewares/role.middleware.js'

const router = express.Router()

router.post('/register', FarmerController.createFarmer)
router.post('/login', FarmerController.loginFarmer)
router.put('/updatePassword', FarmerController.updatePassword)

router.use(auth)

router.put('/updateFarmer', role(), FarmerController.updateFarmer)
router.delete('/:id', role(), FarmerController.deleteFarmer)
router.get('/', role('admin'), FarmerController.getFarmers)
router.get('/:id', role(), FarmerController.getFarmer)

export default router
