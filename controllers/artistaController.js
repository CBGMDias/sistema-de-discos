const { Artista } = require('../models');

// Listar todos os artistas
const getAllArtistas = async (req, res) => {
    try {
        const artistas = await Artista.findAll();
        res.render('artistas/index', { artistas });
    } catch (error) {
        res.status(500).send('Erro ao listar artistas');
    }
};

// Exibir um artista específico
const getArtistaById = async (req, res) => {
    try {
        const artista = await Artista.findByPk(req.params.id);
        if (artista) {
            res.render('artistas/show', { artista });
        } else {
            res.status(404).send('Artista não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao exibir artista');
    }
};

// Exibir formulário para adicionar novo artista
const renderAddArtistaForm = (req, res) => {
    res.render('artistas/new');
};

// Adicionar um novo artista
const addArtista = async (req, res) => {
    try {
        const { nome, nacionalidade, genero_musical, foto } = req.body;
        await Artista.create({ nome, nacionalidade, genero_musical, foto });
        res.redirect('/artistas');
    } catch (error) {
        res.status(500).send('Erro ao adicionar artista');
    }
};

// Exibir formulário para edição de artista
const renderEditArtistaForm = async (req, res) => {
    try {
        const artista = await Artista.findByPk(req.params.id);
        if (artista) {
            res.render('artistas/edit', { artista });
        } else {
            res.status(404).send('Artista não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao carregar formulário de edição');
    }
};

// Atualizar um artista existente
const updateArtista = async (req, res) => {
    try {
        const { nome, nacionalidade, genero_musical, foto } = req.body;
        await Artista.update({ nome, nacionalidade, genero_musical, foto }, {
            where: { id: req.params.id }
        });
        res.redirect('/artistas');
    } catch (error) {
        res.status(500).send('Erro ao atualizar artista');
    }
};

// Deletar um artista
const deleteArtista = async (req, res) => {
    try {
        await Artista.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/artistas');
    } catch (error) {
        res.status(500).send('Erro ao deletar artista');
    }
};

module.exports = {
    getAllArtistas,
    getArtistaById,
    renderAddArtistaForm,
    addArtista,
    renderEditArtistaForm,
    updateArtista,
    deleteArtista
};
