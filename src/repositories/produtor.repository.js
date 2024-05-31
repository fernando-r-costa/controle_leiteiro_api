/* eslint-disable no-useless-catch */
import Produtor from '../models/produtor.model.js'

async function createProdutor (produtor) {
  try {
    const novoProdutor = await Produtor.create(produtor)
    return await getProdutor(novoProdutor.produtorId)
  } catch (err) {
    throw err
  }
}

async function updateProdutor (produtor) {
  try {
    await Produtor.update(produtor, {
      where: {
        produtorId: produtor.produtorId
      }
    })
    return await getProdutor(produtor.produtorId)
  } catch (err) {
    throw err
  }
}

async function deleteProdutor (id) {
  try {
    await Produtor.destroy({
      where: {
        produtorId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function getProdutores () {
  try {
    return await Produtor.findAll()
  } catch (err) {
    throw err
  }
}

async function getProdutor (id) {
  try {
    return await Produtor.findByPk(id)
  } catch (err) {
    throw err
  }
}

async function getProdutorByEmail (email) {
  try {
    return await Produtor.findOne({
      where: {
        email
      },
      attributes: ['produtorId', 'nome', 'email', 'senha']
    })
  } catch (err) {
    throw err
  }
}

export default {
  createProdutor,
  updateProdutor,
  deleteProdutor,
  getProdutores,
  getProdutor,
  getProdutorByEmail
}
