/* eslint-disable no-useless-catch */
import db from '../repositories/db.js'
import Animal from '../models/animal.model.js'
import Farm from '../models/farm.model.js'
import Farmer from '../models/farmer.model.js'

async function createAnimal (animal) {
  const transaction = await db.transaction()
  try {
    const newAnimal = await Animal.create(animal, { transaction })
    await transaction.commit()
    return await getAnimal(newAnimal.animalId)
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

async function updateAnimal (animal) {
  const transaction = await db.transaction()
  try {
    await Animal.update(animal, {
      where: {
        animalId: animal.animalId
      },
      transaction
    })
    await transaction.commit()
    return await getAnimal(animal.animalId)
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

async function deleteAnimal (id) {
  try {
    await Animal.destroy({
      where: {
        animalId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function getAnimals () {
  try {
    return await Animal.findAll()
  } catch (err) {
    throw err
  }
}

async function getAnimal (id) {
  try {
    return await Animal.findByPk(id, {
      include: [
        {
          model: Farm,
          as: 'farm',
          attributes: ['name', 'farmerId'],
          include: [
            {
              model: Farmer,
              as: 'farmer',
              attributes: ['name', 'email', 'phone']
            }
          ]
        }
      ]
    })
  } catch (err) {
    throw err
  }
}

async function getAnimalByNumber (number) {
  try {
    return await Animal.findAll({
      where: {
        number
      }
    })
  } catch (err) {
    throw err
  }
}

async function getAnimalsByFarmId (farmId) {
  try {
    return await Animal.findAll({
      where: {
        farmId
      }
    })
  } catch (err) {
    throw err
  }
}

export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimals,
  getAnimal,
  getAnimalByNumber,
  getAnimalsByFarmId
}
