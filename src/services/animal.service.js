import AnimalRepository from '../repositories/animal.repository.js'
import FarmRepository from '../repositories/farm.repository.js'

async function createAnimal (animal) {
  const hasFarm = await FarmRepository.getFarm(animal.farmId)
  if (!hasFarm) {
    throw new Error('Fazenda não encontrada')
  }
  const hasAnimals = await AnimalRepository.getAnimalByNumber(animal.number)
  for (const hasAnimal of hasAnimals) {
    if (hasAnimal.farmId === animal.farmId) {
      throw new Error('Animal já cadastrado')
    }
  }
  return await AnimalRepository.createAnimal(animal)
}

async function updateAnimal (animal) {
  const hasAnimal = await AnimalRepository.getAnimal(animal.animalId)
  if (!hasAnimal) {
    throw new Error('Animal não encontrado')
  }
  if (hasAnimal.number !== animal.number || hasAnimal.farmId !== animal.farmId) {
    throw new Error('Número do animal e Fazenda não são correspondentes')
  }
  return await AnimalRepository.updateAnimal(animal)
}

async function deleteAnimal (id) {
  await AnimalRepository.deleteAnimal(id)
}

async function getAnimals (farmId) {
  if (farmId) {
    return await AnimalRepository.getAnimalsByFarmId(farmId)
  }
  return await AnimalRepository.getAnimals()
}

async function getAnimal (id) {
  return await AnimalRepository.getAnimal(id)
}

export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimals,
  getAnimal
}
