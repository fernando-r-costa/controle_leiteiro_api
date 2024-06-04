import FarmRepository from '../repositories/farm.repository.js'

async function createFarm (farm) {
  const hasFarm = await FarmRepository.getFarmByName(farm.name)
  if (hasFarm) {
    throw new Error('Fazenda já cadastrada')
  }
  return await FarmRepository.createFarm(farm)
}

async function updateFarm (farm) {
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
