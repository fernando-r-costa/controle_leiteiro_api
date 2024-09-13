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
  if (hasAnimal.number !== animal.number || hasAnimal.farmId !== animal.farmId || hasAnimal.farm.farmerId !== animal.farmerId) {
    throw new Error('Número do animal ou Fazenda ou Proprietário não são correspondentes')
  }
  return await AnimalRepository.updateAnimal(animal)
}

async function deleteAnimal (params) {
  const animal = await AnimalRepository.getAnimal(params.animalId)
  if ((parseInt(params.id) !== animal.farm.farmerId) ||
      (parseInt(params.farmId) !== animal.farmId)) {
    throw new Error('Acesso negado')
  }
  await AnimalRepository.deleteAnimal(params.animalId)
}

async function getAnimalsByFarmId (params) {
  const { farmerId } = await FarmRepository.getFarm(params.farmId)
  if (parseInt(params.id) !== farmerId) {
    throw new Error('Acesso negado')
  }
  return await AnimalRepository.getAnimalsByFarmId(params.farmId)
}

async function getAnimals () {
  return await AnimalRepository.getAnimals()
}

async function getAnimal (params) {
  const animal = await AnimalRepository.getAnimal(params.animalId)
  if ((parseInt(params.id) !== animal.farm.farmerId) ||
      (parseInt(params.farmId) !== animal.farmId)) {
    throw new Error('Acesso negado')
  }
  return await AnimalRepository.getAnimal(params.animalId)
}

export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimals,
  getAnimalsByFarmId,
  getAnimal
}
