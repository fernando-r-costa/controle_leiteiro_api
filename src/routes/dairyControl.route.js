import express from 'express'
import DairyControlController from '../controllers/dairyControl.controller.js'

const router = express.Router()

router.post('/', DairyControlController.createDairyControl)
router.put('/', DairyControlController.updateDairyControl)
router.delete('/:controlId', DairyControlController.deleteDairyControl)
router.get('/', DairyControlController.getDairyControls)
router.get('/:controlId', DairyControlController.getDairyControl)
router.get('/animal/:animalId', DairyControlController.getAllByAnimalId)
router.get('/date/dates', DairyControlController.getAllDates)
router.get('/date/:dairyDateControl', DairyControlController.getAllByDairyDateControl)
router.get('/farm/:farmId', DairyControlController.getDairyControls)
router.get('/farm/:farmId/dates', DairyControlController.getAllDates)
router.get('/farm/:farmId/date/:dairyDateControl', DairyControlController.getAllByDairyDateControl)

export default router
