/* eslint-disable no-undef */
import FarmerService from '../services/farmer.service.js'

async function createFarmer (req, res, next) {
  try {
    let farmer = req.body
    if (!farmer.name || !farmer.email || !farmer.password || !farmer.phone) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    farmer = await FarmerService.createFarmer(farmer)
    res.send(farmer)
    logger.info(`POST /farmer - ${JSON.stringify(farmer)}`)
  } catch (err) {
    next(err)
  }
}

async function updateFarmer (req, res, next) {
  try {
    let farmer = req.body
    if (!farmer.farmerId || !farmer.name || !farmer.email || !farmer.phone) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    farmer = await FarmerService.updateFarmer(farmer)
    res.send(farmer)
    logger.info(`PUT /farmer - ${JSON.stringify(farmer)}`)
  } catch (err) {
    next(err)
  }
}

// updateSenha

async function deleteFarmer (req, res, next) {
  try {
    await FarmerService.deleteFarmer(req.params.id)
    res.end()
    logger.info('DELETE /farmer')
  } catch (err) {
    next(err)
  }
}

async function getFarmers (req, res, next) {
  try {
    res.send(await FarmerService.getFarmers())
    logger.info('GET /farmers')
  } catch (err) {
    next(err)
  }
}

async function getFarmer (req, res, next) {
  try {
    res.send(await FarmerService.getFarmer(req.params.id))
    logger.info('GET /farmer')
  } catch (err) {
    next(err)
  }
}

export default {
  createFarmer,
  updateFarmer,
  deleteFarmer,
  getFarmers,
  getFarmer
}
