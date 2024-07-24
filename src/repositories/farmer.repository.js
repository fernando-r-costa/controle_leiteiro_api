/* eslint-disable no-useless-catch */
import Farmer from '../models/farmer.model.js'

async function createFarmer (farmer) {
  try {
    const newFarmer = await Farmer.create(farmer)
    return await getFarmer(newFarmer.farmerId)
  } catch (err) {
    throw err
  }
}

async function updateFarmer (farmer) {
  try {
    await Farmer.update(farmer, {
      where: {
        farmerId: farmer.farmerId
      }
    })
    return await getFarmer(farmer.farmerId)
  } catch (err) {
    throw err
  }
}

async function deleteFarmer (id) {
  try {
    await Farmer.destroy({
      where: {
        farmerId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function getFarmers () {
  try {
    return await Farmer.findAll()
  } catch (err) {
    throw err
  }
}

async function getFarmer (id) {
  try {
    return await Farmer.findByPk(id)
  } catch (err) {
    throw err
  }
}

async function getFarmerByEmail (email) {
  try {
    return await Farmer.findOne({ where: { email } })
  } catch (err) {
    throw err
  }
}

async function getFarmerByEmailWithPassword (email) {
  try {
    return await Farmer.findOne({ where: { email }, attributes: ['farmerId', 'password'] })
  } catch (err) {
    throw err
  }
}

export default {
  createFarmer,
  updateFarmer,
  deleteFarmer,
  getFarmers,
  getFarmer,
  getFarmerByEmail,
  getFarmerByEmailWithPassword
}
