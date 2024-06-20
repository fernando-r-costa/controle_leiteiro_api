/* eslint-disable no-undef */
import FarmService from '../services/farm.service.js'

async function createFarm (req, res, next) {
  try {
    let farm = req.body
    if (!farm.name || !farm.farmerId) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    farm = await FarmService.createFarm(farm)
    res.send(farm)
    logger.info(`POST /farm - ${JSON.stringify(farm)}`)
  } catch (err) {
    next(err)
  }
}

async function updateFarm (req, res, next) {
  try {
    let farm = req.body
    if (!farm.farmId || !farm.name || !farm.farmerId) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    farm = await FarmService.updateFarm(farm)
    res.send(farm)
    logger.info(`PUT /farm - ${JSON.stringify(farm)}`)
  } catch (err) {
    next(err)
  }
}

async function deleteFarm (req, res, next) {
  try {
    await FarmService.deleteFarm(req.params.id)
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
    res.send(await FarmService.getFarm(req.params.id))
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
