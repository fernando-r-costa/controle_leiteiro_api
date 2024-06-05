import AnimalRepository from '../repositories/animal.repository.js'

async function createAnimal (animal) {
  const hasAnimal = await AnimalRepository.getAnimalByNumber(animal.number)
  if (hasAnimal) {
    throw new Error('Animal já cadastrado')
  }
  return await AnimalRepository.createAnimal(animal)
}

async function updateAnimal (animal) {
  return await AnimalRepository.updateAnimal(animal)
}

async function deleteAnimal (id) {
  await AnimalRepository.deleteAnimal(id)
}

async function getAnimals () {
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
