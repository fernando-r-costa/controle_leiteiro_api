/* eslint-disable no-undef */
import ProdutorService from '../services/produtor.service.js'

async function createProdutor (req, res, next) {
  try {
    let produtor = req.body
    if (!produtor.nome || !produtor.email || !produtor.senha || !produtor.celular) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    produtor = await ProdutorService.createProdutor(produtor)
    res.send(produtor)
    logger.info(`POST /produtor - ${JSON.stringify(produtor)}`)
  } catch (err) {
    next(err)
  }
}

async function updateProdutor (req, res, next) {
  try {
    let produtor = req.body
    if (!produtor.produtorId || !produtor.nome || !produtor.email || !produtor.celular) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    produtor = await ProdutorService.updateProdutor(produtor)
    res.send(produtor)
    logger.info(`PUT /produtor - ${JSON.stringify(produtor)}`)
  } catch (err) {
    next(err)
  }
}

// updateSenha

async function deleteProdutor (req, res, next) {
  try {
    await ProdutorService.deleteProdutor(req.params.id)
    res.end()
    logger.info('DELETE /produtor')
  } catch (err) {
    next(err)
  }
}

async function getProdutores (req, res, next) {
  try {
    res.send(await ProdutorService.getProdutores())
    logger.info('GET /produtores')
  } catch (err) {
    next(err)
  }
}

async function getProdutor (req, res, next) {
  try {
    res.send(await ProdutorService.getProdutor(req.params.id))
    logger.info('GET /produtor')
  } catch (err) {
    next(err)
  }
}

export default {
  createProdutor,
  updateProdutor,
  deleteProdutor,
  getProdutores,
  getProdutor
}
