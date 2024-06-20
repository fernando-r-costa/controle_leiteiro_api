import FarmRepository from '../repositories/farm.repository.js'
import FarmerRepository from '../repositories/farmer.repository.js'

async function createFarm (farm) {
  const hasFarmer = await FarmerRepository.getFarmer(farm.farmerId)
  if (!hasFarmer) {
    throw new Error('Produtor não encontrado')
  }
  const hasFarms = await FarmRepository.getFarmByName(farm.name)
  for (const hasFarm of hasFarms) {
    if (hasFarm.farmerId === farm.farmerId) {
      throw new Error('Fazenda já cadastrada')
    }
  }
  return await FarmRepository.createFarm(farm)
}

async function updateFarm (farm) {
  const hasFarm = await FarmRepository.getFarm(farm.farmId)
  if (!hasFarm) {
    throw new Error('Fazenda não encontrada')
  }
  return await FarmRepository.updateFarm(farm)
}

async function deleteFarm (id) {
  await FarmRepository.deleteFarm(id)
}

async function getFarms (farmerId) {
  if (farmerId) {
    return await FarmRepository.getFarmsByFarmerId(farmerId)
  }
  return await FarmRepository.getFarms()
}

async function getFarm (id) {
  return await FarmRepository.getFarm(id)
}

export default {
  createFarm,
  updateFarm,
  deleteFarm,
  getFarms,
  getFarm
}
