/* eslint-disable no-useless-catch */
import db from '../repositories/db.js'
import DairyControl from '../models/dairyControl.model.js'
import Animal from '../models/animal.model.js'
import Farm from '../models/farm.model.js'

async function createDairyControl (dairyControl) {
  const transaction = await db.transaction()
  try {
    const newDairyControl = await DairyControl.create(dairyControl, { transaction })
    await transaction.commit()
    return await getDairyControl(newDairyControl.registerId, dairyControl.farmerId)
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

async function updateDairyControl (dairyControl) {
  const transaction = await db.transaction()
  try {
    await DairyControl.update(dairyControl, {
      where: {
        registerId: dairyControl.registerId
      },
      transaction
    })
    await transaction.commit()
    return await getDairyControl(dairyControl.registerId, dairyControl.farmerId)
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

async function deleteDairyControl (id) {
  const transaction = await db.transaction()
  try {
    await DairyControl.destroy({
      where: {
        registerId: id
      },
      transaction
    })
    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

async function getDairyControls (farmId) {
  try {
    if (farmId) {
      return await DairyControl.findAll({
        include: {
          model: Animal,
          where: { farmId }
        }
      })
    } else {
      return await DairyControl.findAll()
    }
  } catch (err) {
    throw err
  }
}

async function getDairyControl (controlId, farmerId) {
  try {
    const dairyControl = await DairyControl.findByPk(controlId, {
      include: {
        model: Animal,
        include: {
          model: Farm,
          attributes: ['farmerId'],
          where: { farmerId }
        }
      }
    })
    if (!dairyControl || !dairyControl.animal) {
      return { message: 'Controle de leite não encontrado.' }
    }
    return dairyControl
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

async function getAllByAnimalId (animalId, farmerId) {
  try {
    const dairyControls = await DairyControl.findAll({
      include: {
        model: Animal,
        where: { animalId },
        include: {
          model: Farm,
          where: { farmerId },
          attributes: []
        },
        attributes: []
      },
      order: [['dairyDateControl', 'ASC']]
    })
    if (dairyControls.length === 0) {
      return { message: 'Animal não encontrado ou nenhum controle de leite encontrado.' }
    }
    return dairyControls
  } catch (err) {
    throw err
  }
}

async function getAllByDairyDateControl (farmerId, dairyDateControl) {
  try {
    const dairyControls = await DairyControl.findAll({
      where: {
        dairyDateControl
      },
      include: {
        model: Animal,
        include: {
          model: Farm,
          attributes: ['farmerId'],
          where: { farmerId }
        }
      },
      order: [['animalId', 'ASC']]
    })
    const validDairyControls = dairyControls.filter(dc => dc.animal !== null)
    if (validDairyControls.length === 0) {
      return { message: 'Nenhum controle de leite encontrado.' }
    }

    return dairyControls
  } catch (err) {
    throw err
  }
}

async function getAllDates (farmId, farmerId) {
  try {
    const queryOptions = {
      attributes: ['dairyDateControl'],
      group: ['dairyDateControl']
    }
    if (farmId) {
      queryOptions.include = {
        model: Animal,
        attributes: [],
        where: { farmId },
        include: {
          model: Farm,
          attributes: [],
          where: { farmerId }
        }
      }
    } else if (farmerId) {
      queryOptions.include = {
        model: Animal,
        attributes: [],
        include: {
          model: Farm,
          attributes: [],
          where: { farmerId }
        }
      }
    }
    const dairyControls = await DairyControl.findAll(queryOptions)
    if (dairyControls.length === 0) {
      return { message: 'Nenhum controle de leite encontrado.' }
    }
    return dairyControls
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
  getAllByDairyDateControl,
  getAllDates
}
