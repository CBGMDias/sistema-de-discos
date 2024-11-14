const { Disco } = require('../models');

// Listar todos os discos
const getAllDiscos = async (req, res) => {
    try {
        const discos = await Disco.findAll();
        res.render('discos/index', { discos });
    } catch (error) {
        res.status(500).send('Erro ao listar discos');
    }
};

// Exibir um disco específico
const getDiscoById = async (req, res) => {
    try {
        const disco = await Disco.findByPk(req.params.id);
        if (disco) {
            res.render('discos/show', { disco });
        } else {
            res.status(404).send('Disco não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao exibir disco');
    }
};

// Exibir formulário para adicionar novo disco
const renderAddDiscoForm = (req, res) => {
    res.render('discos/new');
};

// Adicionar um novo disco
const addDisco = async (req, res) => {
    try {
        const { titulo, ano_lancamento, capa, artistaId } = req.body;
        await Disco.create({ titulo, ano_lancamento, capa, artistaId });
        res.redirect('/discos');
    } catch (error) {
        res.status(500).send('Erro ao adicionar disco');
    }
};

// Exibir formulário para edição de disco
const renderEditDiscoForm = async (req, res) => {
    try {
        const disco = await Disco.findByPk(req.params.id);
        if (disco) {
            res.render('discos/edit', { disco });
        } else {
            res.status(404).send('Disco não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao carregar formulário de edição');
    }
};

// Atualizar um disco existente
const updateDisco = async (req, res) => {
    try {
        const { titulo, ano_lancamento, capa, artistaId } = req.body;
        await Disco.update({ titulo, ano_lancamento, capa, artistaId }, {
            where: { id: req.params.id }
        });
        res.redirect('/discos');
    } catch (error) {
        res.status(500).send('Erro ao atualizar disco');
    }
};

// Deletar um disco
const deleteDisco = async (req, res) => {
    try {
        await Disco.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/discos');
    } catch (error) {
        res.status(500).send('Erro ao deletar disco');
    }
};

module.exports = {
    getAllDiscos,
    getDiscoById,
    renderAddDiscoForm,
    addDisco,
    renderEditDiscoForm,
    updateDisco,
    deleteDisco
};
