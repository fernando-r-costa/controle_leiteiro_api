import express from 'express'
import FarmController from '../controllers/farm.controller.js'

const router = express.Router()

router.post('/', FarmController.createFarm)
router.put('/', FarmController.updateFarm)
router.delete('/:id', FarmController.deleteFarm)
router.get('/', FarmController.getFarms)
router.get('/farmer/:id', FarmController.getFarms)
router.get('/:id', FarmController.getFarm)

export default router
