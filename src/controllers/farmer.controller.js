/* eslint-disable no-undef */
import FarmerService from '../services/farmer.service.js'
import validateRequiredFields from '../utils/utils.js'

async function createFarmer (req, res, next) {
  try {
    const { name, email, password, phone } = req.body
    validateRequiredFields([name, email, password, phone])
    const farmer = await FarmerService.createFarmer({ name, email, password, phone })
    res.send(farmer)
    logger.info(`POST /farmer - ${JSON.stringify(farmer)}`)
  } catch (err) {
    next(err)
  }
}

async function loginFarmer (req, res, next) {
  try {
    const { email, password } = req.body
    validateRequiredFields([email, password])
    const { token, farmer } = await FarmerService.loginFarmer({ email, password })
    res.send({ token })
    logger.info(`POST /farmer/login - ${JSON.stringify({ farmerId: farmer.farmerId, name: farmer.name })}`)
  } catch (err) {
    next(err)
  }
}

async function updatePassword (req, res, next) {
  try {
    const { name, email, password, phone } = req.body
    validateRequiredFields([name, email, password, phone])
    const updatedFarmer = await FarmerService.updatePassword({ name, email, password, phone })
    res.send(updatedFarmer)
    logger.info(`PUT /farmer/password - ${JSON.stringify(updatedFarmer)}`)
  } catch (err) {
    next(err)
  }
}

async function updateFarmer (req, res, next) {
  try {
    const { farmerId, name, email, phone } = req.body
    validateRequiredFields([farmerId, name, email, phone])
    const updatedFarmer = await FarmerService.updateFarmer({ farmerId, name, email, phone })
    res.send(updatedFarmer)
    logger.info(`PUT /farmer/update - ${JSON.stringify(updatedFarmer)}`)
  } catch (err) {
    next(err)
  }
}

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
    const farmers = await FarmerService.getFarmers()
    res.send(farmers)
    logger.info('GET /farmers')
  } catch (err) {
    next(err)
  }
}

async function getFarmer (req, res, next) {
  try {
    const farmer = await FarmerService.getFarmer(req.params.id)
    res.send(farmer)
    logger.info('GET /farmer')
  } catch (err) {
    next(err)
  }
}

export default {
  createFarmer,
  loginFarmer,
  updatePassword,
  updateFarmer,
  deleteFarmer,
  getFarmers,
  getFarmer
}
