import FarmerRepository from '../repositories/farmer.repository.js'

async function createFarmer (farmer) {
  const hasFarmer = await FarmerRepository.getFarmerByEmail(farmer.email)
  if (hasFarmer) {
    throw new Error('Produtor já cadastrado')
  }
  return await FarmerRepository.createFarmer(farmer)
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

export default {
  createFarmer,
  updateFarmer,
  deleteFarmer,
  getFarmers,
  getFarmer
}
