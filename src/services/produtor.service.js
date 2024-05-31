import ProdutorRepository from '../repositories/produtor.repository.js'

async function createProdutor (produtor) {
  const existeProdutor = await ProdutorRepository.getProdutorByEmail(produtor.email)
  if (existeProdutor) {
    throw new Error('Produtor já cadastrado')
  }
  return await ProdutorRepository.createProdutor(produtor)
}

async function updateProdutor (produtor) {
  return await ProdutorRepository.updateProdutor(produtor)
}

async function deleteProdutor (id) {
  await ProdutorRepository.deleteProdutor(id)
}

async function getProdutores () {
  return await ProdutorRepository.getProdutores()
}

async function getProdutor (id) {
  return await ProdutorRepository.getProdutor(id)
}

export default {
  createProdutor,
  updateProdutor,
  deleteProdutor,
  getProdutores,
  getProdutor
}
