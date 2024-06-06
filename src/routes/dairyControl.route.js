import express from 'express'
import DairyControlController from '../controllers/dairyControl.controller.js'

const router = express.Router()

router.post('/', DairyControlController.createDairyControl)
router.put('/', DairyControlController.updateDairyControl)
router.delete('/:id', DairyControlController.deleteDairyControl)
router.get('/', DairyControlController.getDairyControls)
router.get('/:id', DairyControlController.getDairyControl)
router.get('/animal/:animalId', DairyControlController.getAllByAnimalId)
router.get('/date/:dairyDateControl', DairyControlController.getAllByDairyDateControl)

export default router
