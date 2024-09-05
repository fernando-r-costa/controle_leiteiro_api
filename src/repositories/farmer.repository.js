/* eslint-disable no-useless-catch */
import Farmer from '../models/farmer.model.js'

async function createFarmer (farmer) {
  const newFarmer = await Farmer.create(farmer)
  return await getFarmer(newFarmer.farmerId)
}

async function updatePassword (farmer, password) {
  farmer.password = password
  await farmer.save()
  return farmer
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
  return await Farmer.findOne({ where: { email }, attributes: ['farmerId', 'password'] })
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
