/* eslint-disable no-useless-catch */
import db from '../repositories/db.js'
import Farm from '../models/farm.model.js'
import Farmer from '../models/farmer.model.js'

async function createFarm (farm) {
  const transaction = await db.transaction()
  try {
    const newFarm = await Farm.create(farm, { transaction })
    await transaction.commit()
    return await getFarm(newFarm.farmId)
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

async function updateFarm (farm) {
  const transaction = await db.transaction()
  try {
    await Farm.update(farm, {
      where: {
        farmId: farm.farmId
      },
      transaction
    })
    await transaction.commit()
    return await getFarm(farm.farmId)
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

async function deleteFarm (id) {
  try {
    await Farm.destroy({
      where: {
        farmId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function getFarms () {
  try {
    return await Farm.findAll()
  } catch (err) {
    throw err
  }
}

async function getFarm (id) {
  try {
    return await Farm.findByPk(id, {
      include: [
        {
          model: Farmer,
          as: 'farmer',
          attributes: ['name', 'email', 'phone']
        }
      ]
    })
  } catch (err) {
    throw err
  }
}

async function getFarmByName (name) {
  try {
    return await Farm.findAll({
      where: {
        name
      }
    })
  } catch (err) {
    throw err
  }
}

async function getFarmsByFarmerId (farmerId) {
  try {
    return await Farm.findAll({
      where: {
        farmerId
      },
      attributes: ['farmId', 'name', 'farmerId']
    })
  } catch (err) {
    throw err
  }
}

export default {
  createFarm,
  updateFarm,
  deleteFarm,
  getFarms,
  getFarm,
  getFarmByName,
  getFarmsByFarmerId
}
