import express from 'express'
import AnimalController from '../controllers/animal.controller.js'
import role from '../middlewares/role.middleware.js'

const router = express.Router()

router.post('/', role(), AnimalController.createAnimal)
router.put('/', role(), AnimalController.updateAnimal)
router.delete('/farmer/:id/farm/:farmId/animal/:animalId', role(), AnimalController.deleteAnimal)
router.get('/', role('admin'), AnimalController.getAnimals)
router.get('/farmer/:id/farm/:farmId', role(), AnimalController.getAnimalsByFarmID)
router.get('/farmer/:id/farm/:farmId/animal/:animalId', role(), AnimalController.getAnimal)

export default router
