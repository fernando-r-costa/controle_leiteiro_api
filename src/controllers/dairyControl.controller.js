/* eslint-disable no-undef */
import DairyControlService from '../services/dairyControl.service.js'

async function createDairyControl (req, res, next) {
  try {
    let dairyControl = req.body
    if (!dairyControl.dairyDateControl || !dairyControl.animalId || !dairyControl.weightMilking1 || !dairyControl.dim) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    dairyControl = await DairyControlService.createDairyControl(dairyControl)
    res.send(dairyControl)
    logger.info(`POST /dairyControl - ${JSON.stringify(dairyControl)}`)
  } catch (err) {
    next(err)
  }
}

async function updateDairyControl (req, res, next) {
  try {
    let dairyControl = req.body
    if (!dairyControl.registerId || !dairyControl.dairyDateControl || !dairyControl.animalId || !dairyControl.weightMilking1 || !dairyControl.dim) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    dairyControl = await DairyControlService.updateDairyControl(dairyControl)
    res.send(dairyControl)
    logger.info(`PUT /dairyControl - ${JSON.stringify(dairyControl)}`)
  } catch (err) {
    next(err)
  }
}

async function deleteDairyControl (req, res, next) {
  try {
    await DairyControlService.deleteDairyControl(req.params.controlId)
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
    res.send(await DairyControlService.getDairyControl(req.params.controlId))
    logger.info('GET /dairyControl')
  } catch (err) {
    next(err)
  }
}

async function getAllByAnimalId (req, res, next) {
  try {
    res.send(await DairyControlService.getAllByAnimalId(req.params.animalId))
    logger.info('GET /dairyAnimalId')
  } catch (err) {
    next(err)
  }
}

async function getAllByDairyDateControl (req, res, next) {
  try {
    res.send(await DairyControlService.getAllByDairyDateControl(req.params.farmId, req.params.dairyDateControl))
    logger.info('GET /dairyDateControl')
  } catch (err) {
    next(err)
  }
}

async function getAllDates (req, res, next) {
  try {
    res.send(await DairyControlService.getAllDates(req.params.farmId))
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
