import express from 'express'
import DairyControlController from '../controllers/dairyControl.controller.js'
import role from '../middlewares/role.middleware.js'

const router = express.Router()

router.post('/', role(), DairyControlController.createDairyControl)
router.put('/', role(), DairyControlController.updateDairyControl)
router.delete('/farmer/:id/farm/:farmId/animal/:animalId/:controlId', role(), DairyControlController.deleteDairyControl)
router.get('/', role('admin'), DairyControlController.getDairyControls)
router.get('/date/dates', role('admin'), DairyControlController.getAllDates)
router.get('/farmer/:id/:controlId', role(), DairyControlController.getDairyControl)
router.get('/farmer/:id/animal/:animalId', role(), DairyControlController.getAllByAnimalId)
router.get('/farmer/:id/farm/:farmId/dates', role(), DairyControlController.getAllDates)
router.get('/farmer/:id/farm/:farmId/date/:dairyDateControl', role(), DairyControlController.getAllByDairyDateControl)

export default router
