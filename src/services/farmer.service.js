import FarmerRepository from '../repositories/farmer.repository.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function createFarmer (farmer) {
  const hasFarmer = await FarmerRepository.getFarmerByEmail(farmer.email)
  if (hasFarmer) {
    throw new Error('Produtor já cadastrado!')
  }
  farmer.password = await bcrypt.hash(farmer.password, 10)
  return await FarmerRepository.createFarmer(farmer)
}

async function login (email, password) {
  const farmer = await FarmerRepository.getFarmerByEmailWithPassword(email)
  if (!farmer) {
    throw new Error('E-mail não encontrado!')
  }
  const isMatch = await bcrypt.compare(password, farmer.password)
  if (!isMatch) {
    throw new Error('Senha incorreta!')
  }
  const token = jwt.sign({ id: farmer.farmerId }, process.env.JWT_SECRET, { expiresIn: '1h' })
  return token
}

async function updateFarmer (farmer) {
  const hasFarmer = await FarmerRepository.getFarmerByEmail(farmer.email)
  if (!hasFarmer) {
    throw new Error('E-mail não encontrado!')
  }
  if (farmer.farmerId !== hasFarmer.farmerId) {
    throw new Error('O ID e o e-mail não correspondem ao mesmo cadastro!')
  }
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
  updateFarmer,
  deleteFarmer,
  getFarmers,
  getFarmer,
  getFarmerByEmail,
  getFarmerByEmailWithPassword,
  login
}
