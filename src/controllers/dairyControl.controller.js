/* eslint-disable no-undef */
import DairyControlService from '../services/dairyControl.service.js'
import validateRequiredFields from '../utils/utils.js'

async function createDairyControl (req, res, next) {
  try {
    const { dairyDateControl, animalId, weightMilking1, farmerId } = req.body
    validateRequiredFields([dairyDateControl, animalId, weightMilking1, farmerId])
    const dairyControl = await DairyControlService.createDairyControl({ dairyDateControl, animalId, weightMilking1, farmerId })
    res.send(dairyControl)
    logger.info(`POST /dairyControl - ${JSON.stringify(dairyControl)}`)
  } catch (err) {
    next(err)
  }
}

async function updateDairyControl (req, res, next) {
  try {
    const { registerId, dairyDateControl, animalId, weightMilking1, farmerId } = req.body
    validateRequiredFields([registerId, dairyDateControl, animalId, weightMilking1, farmerId])
    const dairyControl = await DairyControlService.updateDairyControl({ registerId, dairyDateControl, animalId, weightMilking1, farmerId })
    res.send(dairyControl)
    logger.info(`PUT /dairyControl - ${JSON.stringify(dairyControl)}`)
  } catch (err) {
    next(err)
  }
}

async function deleteDairyControl (req, res, next) {
  try {
    await DairyControlService.deleteDairyControl(req.params)
    res.end()
    logger.info('DELETE /dairyControl')
  } catch (err) {
    next(err)
  }
}

async function getDairyControls (req, res, next) {
  try {
    res.send(await DairyControlService.getDairyControls(req.params.farmId))
    logger.info('GET /dairyControls')
  } catch (err) {
    next(err)
  }
}

async function getDairyControl (req, res, next) {
  try {
    res.send(await DairyControlService.getDairyControl(req.params))
    logger.info('GET /dairyControl')
  } catch (err) {
    next(err)
  }
}

async function getAllByAnimalId (req, res, next) {
  try {
    res.send(await DairyControlService.getAllByAnimalId(req.params))
    logger.info('GET /dairyAnimalId')
  } catch (err) {
    next(err)
  }
}

async function getAllByDairyDateControl (req, res, next) {
  try {
    res.send(await DairyControlService.getAllByDairyDateControl(req.params))
    logger.info('GET /dairyDateControl')
  } catch (err) {
    next(err)
  }
}

async function getAllDates (req, res, next) {
  try {
    res.send(await DairyControlService.getAllDates(req.params))
    logger.info('GET /dairyDates')
  } catch (err) {
    next(err)
  }
}

export default {
  createDairyControl,
  updateDairyControl,
  deleteDairyControl,
  getDairyControls,
  getDairyControl,
  getAllByAnimalId,
  getAllByDairyDateControl,
  getAllDates
}
