import FarmerRepository from '../repositories/farmer.repository.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function createFarmer ({ name, email, password, phone }) {
  const hasFarmer = await FarmerRepository.getFarmerByEmail(email)
  if (hasFarmer) {
    throw new Error('Produtor já cadastrado!')
  }
  const farmer = { name, email, password, phone }
  return await FarmerRepository.createFarmer(farmer)
}

async function loginFarmer ({ email, password }) {
  const farmer = await FarmerRepository.getFarmerByEmailWithPassword(email)
  if (!farmer) {
    throw new Error('E-mail não encontrado!')
  }
  const isMatch = await bcrypt.compare(password, farmer.password)
  if (!isMatch) {
    throw new Error('Senha inválida!')
  }
  const token = jwt.sign({ farmerId: farmer.farmerId, role: farmer.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
  return { token, farmer }
}

async function updatePassword ({ name, email, password, phone }) {
  const farmer = await FarmerRepository.getFarmerByEmail(email)
  if (!farmer || farmer.name !== name || farmer.phone !== phone) {
    throw new Error('Dados não conferem com os registros')
  }
  await FarmerRepository.updatePassword(farmer, password)
  const updatedFarmer = { name, email, phone }
  return updatedFarmer
}

async function updateFarmer (farmer) {
  return await FarmerRepository.updateFarmer(farmer)
}

async function deleteFarmer (id) {
  await FarmerRepository.deleteFarmer(id)
}

async function getFarmers () {
  return await FarmerRepository.getFarmers()
}

async function getFarmer (id) {
  return await FarmerRepository.getFarmer(id)
}

async function getFarmerByEmail (email) {
  return await FarmerRepository.getFarmerByEmail(email)
}

async function getFarmerByEmailWithPassword (email) {
  return await FarmerRepository.getFarmerByEmailWithPassword(email)
}

export default {
  createFarmer,
  loginFarmer,
  updatePassword,
  updateFarmer,
  deleteFarmer,
  getFarmers,
  getFarmer,
  getFarmerByEmail,
  getFarmerByEmailWithPassword
}
