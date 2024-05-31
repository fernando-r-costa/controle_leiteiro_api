import express from 'express'
import ProdutorController from '../controllers/produtor.controller.js'

const router = express.Router()

router.post('/', ProdutorController.createProdutor)
router.put('/', ProdutorController.updateProdutor)
router.delete('/:id', ProdutorController.deleteProdutor)
router.get('/', ProdutorController.getProdutores)
router.get('/:id', ProdutorController.getProdutor)

export default router
