import DairyControlRepository from '../repositories/dairyControl.repository.js'
import AnimalRepository from '../repositories/animal.repository.js'
import Utils from '../utils/utils.js'

async function createDairyControl (dairyControl) {
  const hasAnimal = await AnimalRepository.getAnimal(dairyControl.animalId)
  if (!hasAnimal) {
    throw new Error('Animal não encontrado')
  }
  const hasDairyControl = await DairyControlRepository.getDairyControlByAnimalIdAndDate(dairyControl.animalId, dairyControl.dairyDateControl)
  if (hasDairyControl) {
    throw new Error('Já existe um registro para este animal na data informada')
  }
  const { dim, dtc } = Utils.calculateDIMAndDTC(hasAnimal.calvingDate, dairyControl.dairyDateControl, hasAnimal.expectedDate)
  return await DairyControlRepository.createDairyControl({ ...dairyControl, dim, dtc })
}

async function updateDairyControl (dairyControl) {
  const hasDairyControl = await DairyControlRepository.getDairyControl(dairyControl.registerId, dairyControl.farmerId)
  if (!hasDairyControl) {
    throw new Error('Registro não encontrado')
  }
  const isSameDate = new Date(dairyControl.dairyDateControl).toISOString() === hasDairyControl.dairyDateControl.toISOString()
  if (dairyControl.registerId !== hasDairyControl.registerId || !isSameDate || dairyControl.animalId !== hasDairyControl.animalId) {
    throw new Error('Não é permitido alterar os campos')
  }
  return await DairyControlRepository.updateDairyControl(dairyControl)
}

async function deleteDairyControl (params) {
  const dairyControl = await DairyControlRepository.getDairyControl(params.controlId, params.id)
  if (dairyControl.message) {
    throw new Error(dairyControl.message)
  }
  if ((parseInt(params.id) !== dairyControl.animal.farm.farmerId) ||
      (parseInt(params.farmId) !== dairyControl.animal.farmId) ||
      (parseInt(params.animalId) !== dairyControl.animal.animalId)) {
    throw new Error('Acesso negado')
  }
  await DairyControlRepository.deleteDairyControl(params.controlId)
}

async function getDairyControls (farmId) {
  return await DairyControlRepository.getDairyControls(farmId)
}

async function getDairyControl (params) {
  return await DairyControlRepository.getDairyControl(params.controlId, params.id)
}

async function getAllByAnimalId (params) {
  return await DairyControlRepository.getAllByAnimalId(params.animalId, params.id)
}

async function getAllByDairyDateControl (params) {
  return await DairyControlRepository.getAllByDairyDateControl(params.id, params.farmId, params.dairyDateControl)
}

async function getAllDates (params) {
  return await DairyControlRepository.getAllDates(params.farmId, params.id)
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
