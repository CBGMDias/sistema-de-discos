const express = require('express');
const router = express.Router();
const faixaController = require('../controllers/faixaController');

// Rota para listar todos os faixas
router.get('/', faixaController.getAllFaixas);

// Rota para criar um novo faixa
router.post('/', faixaController.addFaixa);

// Rota para exibir o formulário de edição de uma faixa específica
router.get('/:id/edit', faixaController.renderEditFaixaForm);

// Rota para atualizar um faixa
router.put('/:id', faixaController.updateFaixa);

// Rota para deletar um faixa
router.delete('/:id', faixaController.deleteFaixa);

// Rota auxiliar post
router.post('/:id', faixaController.postAuxiliar);

module.exports = router;
