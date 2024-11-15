const { Faixa } = require('../models');

// Listar todos os faixas
const getAllFaixas = async (req, res) => {
    try {
        const faixas = await Faixa.findAll();
        res.render('faixas/index', { faixas });
    } catch (error) {
        res.status(500).send('Erro ao listar faixas');
    }
};

// Exibir um faixa específico
const getFaixaById = async (req, res) => {
    try {
        const faixa = await Faixa.findByPk(req.params.id);
        if (faixa) {
            res.render('faixas/show', { faixa });
        } else {
            res.status(404).send('Faixa não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao exibir faixa');
    }
};

// Exibir formulário para adicionar novo faixa
const renderAddFaixaForm = (req, res) => {
    res.render('faixas/new');
};

// Adicionar um novo faixa
const addFaixa = async (req, res) => {
    try {
        const { titulo, discoId } = req.body;
        await Faixa.create({ titulo, discoId });
        res.redirect('/faixas');
    } catch (error) {
        res.status(500).send('Erro ao adicionar faixa');
    }
};

// Exibir formulário para edição de faixa
const renderEditFaixaForm = async (req, res) => {
    try {
        const faixa = await Faixa.findByPk(req.params.id);
        if (faixa) {
            res.render('faixas/edit', { faixa });
        } else {
            res.status(404).send('Faixa não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao carregar formulário de edição');
    }
};

// Atualizar um faixa existente
const updateFaixa = async (req, res) => {
    try {
        const { titulo, discoId } = req.body;
        await Faixa.update({ titulo, discoId }, {
            where: { id: req.params.id }
        });
        res.redirect('/faixas');
    } catch (error) {
        res.status(500).send('Erro ao atualizar faixa');
    }
};

// Deletar um faixa
const deleteFaixa = async (req, res) => {
    try {
        await Faixa.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/faixas');
    } catch (error) {
        res.status(500).send('Erro ao deletar faixa');
    }
};

module.exports = {
    getAllFaixas,
    getFaixaById,
    renderAddFaixaForm,
    addFaixa,
    renderEditFaixaForm,
    updateFaixa,
    deleteFaixa
};
