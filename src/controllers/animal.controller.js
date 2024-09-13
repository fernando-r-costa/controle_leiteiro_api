/* eslint-disable no-undef */
import AnimalService from '../services/animal.service.js'

async function createAnimal (req, res, next) {
  try {
    let animal = req.body
    if (!animal.number || !animal.calvingDate || !animal.farmerId || !animal.farmId) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    animal = await AnimalService.createAnimal(animal)
    res.send(animal)
    logger.info(`POST /animal - ${JSON.stringify(animal)}`)
  } catch (err) {
    next(err)
  }
}

async function updateAnimal (req, res, next) {
  try {
    let animal = req.body
    if (!animal.animalId || !animal.number || !animal.calvingDate || !animal.farmerId || !animal.farmId) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    animal = await AnimalService.updateAnimal(animal)
    res.send(animal)
    logger.info(`PUT /animal - ${JSON.stringify(animal)}`)
  } catch (err) {
    next(err)
  }
}

async function deleteAnimal (req, res, next) {
  try {
    await AnimalService.deleteAnimal(req.params)
    res.end()
    logger.info('DELETE /animal')
  } catch (err) {
    next(err)
  }
}

async function getAnimalsByFarmID (req, res, next) {
  try {
    res.send(await AnimalService.getAnimalsByFarmId(req.params))
    logger.info('GET /animals')
  } catch (err) {
    next(err)
  }
}

async function getAnimals (req, res, next) {
  try {
    res.send(await AnimalService.getAnimals())
    logger.info('GET /animals')
  } catch (err) {
    next(err)
  }
}

async function getAnimal (req, res, next) {
  try {
    res.send(await AnimalService.getAnimal(req.params))
    logger.info('GET /animal')
  } catch (err) {
    next(err)
  }
}

export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimals,
  getAnimalsByFarmID,
  getAnimal
}
