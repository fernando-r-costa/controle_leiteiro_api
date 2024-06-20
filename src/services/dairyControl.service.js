import DairyControlRepository from '../repositories/dairyControl.repository.js'
import AnimalRepository from '../repositories/animal.repository.js'

async function createDairyControl (dairyControl) {
  const hasAnimal = await AnimalRepository.getAnimal(dairyControl.animalId)
  if (!hasAnimal) {
    throw new Error('Animal não encontrado')
  }
  const hasDairyControl = await DairyControlRepository.getDairyControlByAnimalIdAndDate(dairyControl.animalId, dairyControl.dairyDateControl)
  if (hasDairyControl) {
    throw new Error('Já existe um registro para este animal na data informada')
  }
  return await DairyControlRepository.createDairyControl(dairyControl)
}

async function updateDairyControl (dairyControl) {
  const hasDairyControl = await DairyControlRepository.getDairyControl(dairyControl.registerId)
  if (!hasDairyControl) {
    throw new Error('Registro não encontrado')
  }
  return await DairyControlRepository.updateDairyControl(dairyControl)
}

async function deleteDairyControl (id) {
  await DairyControlRepository.deleteDairyControl(id)
}

async function getDairyControls (farmId) {
  return await DairyControlRepository.getDairyControls(farmId)
}

async function getDairyControl (id) {
  return await DairyControlRepository.getDairyControl(id)
}

async function getAllByAnimalId (animalId) {
  return await DairyControlRepository.getAllByAnimalId(animalId)
}

async function getAllByDairyDateControl (farmId, dairyDateControl) {
  return await DairyControlRepository.getAllByDairyDateControl(farmId, dairyDateControl)
}

async function getAllDates (farmId) {
  return await DairyControlRepository.getAllDates(farmId)
}

export default {
  createDairyControl,
  updateDairyControl,
  deleteDairyControl,
  getDairyControls,
  getDairyControl,
  getAllByAnimalId,
  getAllByDairyDateControl,
  getAllDates
}
