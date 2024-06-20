import express from 'express'
import AnimalController from '../controllers/animal.controller.js'

const router = express.Router()

router.post('/', AnimalController.createAnimal)
router.put('/', AnimalController.updateAnimal)
router.delete('/:id', AnimalController.deleteAnimal)
router.get('/', AnimalController.getAnimals)
router.get('/farm/:id', AnimalController.getAnimals)
router.get('/:id', AnimalController.getAnimal)

export default router
