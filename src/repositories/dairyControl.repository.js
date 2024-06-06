/* eslint-disable no-useless-catch */
import DairyControl from '../models/dairyControl.model.js'

async function createDairyControl (dairyControl) {
  try {
    const newDairyControl = await DairyControl.create(dairyControl)
    return await getDairyControl(newDairyControl.registerId)
  } catch (err) {
    throw err
  }
}

async function updateDairyControl (dairyControl) {
  try {
    await DairyControl.update(dairyControl, {
      where: {
        registerId: dairyControl.registerId
      }
    })
    return await getDairyControl(dairyControl.registerId)
  } catch (err) {
    throw err
  }
}

async function deleteDairyControl (id) {
  try {
    await DairyControl.destroy({
      where: {
        registerId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function getDairyControls () {
  try {
    return await DairyControl.findAll()
  } catch (err) {
    throw err
  }
}

async function getDairyControl (id) {
  try {
    return await DairyControl.findByPk(id)
  } catch (err) {
    throw err
  }
}

async function getDairyControlByAnimalIdAndDate (animalId, date) {
  try {
    return await DairyControl.findOne({
      where: {
        animalId,
        dairyDateControl: date
      }
    })
  } catch (err) {
    throw err
  }
}

async function getAllByAnimalId (animalId) {
  try {
    return await DairyControl.findAll({
      where: {
        animalId
      },
      order: [
        ['dairyDateControl', 'ASC']
      ]
    })
  } catch (err) {
    throw err
  }
}

async function getAllByDairyDateControl (date) {
  try {
    return await DairyControl.findAll({
      where: {
        dairyDateControl: date
      },
      order: [
        ['animalId', 'ASC']
      ]
    })
  } catch (err) {
    throw err
  }
}

export default {
  createDairyControl,
  updateDairyControl,
  deleteDairyControl,
  getDairyControls,
  getDairyControl,
  getDairyControlByAnimalIdAndDate,
  getAllByAnimalId,
  getAllByDairyDateControl
}
