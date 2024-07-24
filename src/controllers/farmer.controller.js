/* eslint-disable no-undef */
import FarmerService from '../services/farmer.service.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function createFarmer (req, res, next) {
  try {
    let farmer = req.body
    if (!farmer.name || !farmer.email || !farmer.password || !farmer.phone) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    farmer.password = await bcrypt.hash(farmer.password, 10)
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

// implantar o updateSenha depois do sistema rodando.

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

async function loginFarmer (req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new Error('E-mail e senha são obrigatórios')
    }

    const farmer = await FarmerService.getFarmerByEmailWithPassword(email)
    if (!farmer) {
      return res.status(401).send({ error: 'E-mail ou senha inválidos' })
    }

    const isMatch = await bcrypt.compare(password, farmer.password)
    if (!isMatch) {
      return res.status(401).send({ error: 'E-mail ou senha inválidos' })
    }

    const token = jwt.sign({ id: farmer.farmerId }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.send({ token })
  } catch (err) {
    next(err)
  }
}

export default {
  createFarmer,
  updateFarmer,
  deleteFarmer,
  getFarmers,
  getFarmer,
  loginFarmer
}
