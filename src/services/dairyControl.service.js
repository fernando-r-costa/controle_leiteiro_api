import DairyControlRepository from '../repositories/dairyControl.repository.js'

async function createDairyControl (dairyControl) {
  const hasDairyControl = await DairyControlRepository.getDairyControlByAnimalIdAndDate(dairyControl.animalId, dairyControl.dairyDateControl)
  if (hasDairyControl) {
    throw new Error('Já existe um registro para este animal na data informada')
  }
  return await DairyControlRepository.createDairyControl(dairyControl)
}

async function updateDairyControl (dairyControl) {
  return await DairyControlRepository.updateDairyControl(dairyControl)
}

async function deleteDairyControl (id) {
  await DairyControlRepository.deleteDairyControl(id)
}

async function getDairyControls () {
  return await DairyControlRepository.getDairyControls()
}

async function getDairyControl (id) {
  return await DairyControlRepository.getDairyControl(id)
}

async function getAllByAnimalId (animalId) {
  return await DairyControlRepository.getAllByAnimalId(animalId)
}

async function getAllByDairyDateControl (dairyDateControl) {
  return await DairyControlRepository.getAllByDairyDateControl(dairyDateControl)
}

export default {
  createDairyControl,
  updateDairyControl,
  deleteDairyControl,
  getDairyControls,
  getDairyControl,
  getAllByAnimalId,
  getAllByDairyDateControl
}
