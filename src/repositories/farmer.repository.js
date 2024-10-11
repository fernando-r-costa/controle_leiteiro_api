/* eslint-disable no-useless-catch */
import db from '../repositories/db.js'
import Farmer from '../models/farmer.model.js'

async function createFarmer (farmer) {
  const transaction = await db.transaction()
  try {
    const newFarmer = await Farmer.create(farmer, { transaction })
    await transaction.commit()
    return await getFarmer(newFarmer.farmerId)
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

async function updatePassword (farmer, password) {
  const transaction = await db.transaction()
  try {
    farmer.password = password
    await farmer.save({ transaction })
    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

async function updateFarmer (farmer) {
  await Farmer.update(farmer, {
    where: {
      farmerId: farmer.farmerId
    }
  })
  return await getFarmer(farmer.farmerId)
}

async function deleteFarmer (id) {
  await Farmer.destroy({
    where: {
      farmerId: id
    }
  })
}

async function getFarmers () {
  return await Farmer.findAll()
}

async function getFarmer (id) {
  return await Farmer.findByPk(id)
}

async function getFarmerByEmail (email) {
  return await Farmer.findOne({ where: { email } })
}

async function getFarmerByEmailWithPassword (email) {
  return await Farmer.findOne({ where: { email }, attributes: ['farmerId', 'name', 'password', 'role'] })
}

export default {
  createFarmer,
  updatePassword,
  updateFarmer,
  deleteFarmer,
  getFarmers,
  getFarmer,
  getFarmerByEmail,
  getFarmerByEmailWithPassword
}
