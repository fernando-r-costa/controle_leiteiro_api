import express from 'express'
import FarmController from '../controllers/farm.controller.js'
import role from '../middlewares/role.middleware.js'

const router = express.Router()

router.post('/', role(), FarmController.createFarm)
router.put('/', role(), FarmController.updateFarm)
router.delete('/farmer/:id/farm/:farmId', role(), FarmController.deleteFarm)
router.get('/', role('admin'), FarmController.getFarms)
router.get('/farmer/:id', role(), FarmController.getFarms)
router.get('/farmer/:id/farm/:farmId', role(), FarmController.getFarm)

export default router
