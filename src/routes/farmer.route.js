import express from 'express'
import FarmerController from '../controllers/farmer.controller.js'

const router = express.Router()

router.post('/', FarmerController.createFarmer)
router.put('/', FarmerController.updateFarmer)
router.delete('/:id', FarmerController.deleteFarmer)
router.get('/', FarmerController.getFarmers)
router.get('/:id', FarmerController.getFarmer)

export default router
