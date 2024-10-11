/* eslint-disable no-undef */
import FarmService from '../services/farm.service.js'
import validateRequiredFields from '../utils/utils.js'

async function createFarm (req, res, next) {
  try {
    const { name, farmerId } = req.body
    validateRequiredFields([name, farmerId])
    const farm = await FarmService.createFarm({ name, farmerId })
    res.send(farm)
    logger.info(`POST /farm - ${JSON.stringify(farm)}`)
  } catch (err) {
    next(err)
  }
}

async function updateFarm (req, res, next) {
  try {
    const { farmId, name, farmerId } = req.body
    validateRequiredFields([farmId, name, farmerId])
    const farm = await FarmService.updateFarm({ farmId, name, farmerId })
    res.send(farm)
    logger.info(`PUT /farm - ${JSON.stringify(farm)}`)
  } catch (err) {
    next(err)
  }
}

async function deleteFarm (req, res, next) {
  try {
    await FarmService.deleteFarm(req.params.farmId)
    res.end()
    logger.info('DELETE /farm')
  } catch (err) {
    next(err)
  }
}

async function getFarms (req, res, next) {
  try {
    res.send(await FarmService.getFarms(req.params.id))
    logger.info('GET /farms')
  } catch (err) {
    next(err)
  }
}

async function getFarm (req, res, next) {
  try {
    res.send(await FarmService.getFarm(req.params))
    logger.info('GET /farm')
  } catch (err) {
    next(err)
  }
}

export default {
  createFarm,
  updateFarm,
  deleteFarm,
  getFarms,
  getFarm
}
