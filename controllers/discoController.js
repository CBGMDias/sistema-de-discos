const { Disco, Faixa, Artista } = require('../models');

// Listar todos os discos
const getAllDiscos = async (req, res) => {
  try {
      const discos = await Disco.findAll({
          include: [
              {
                  model: Artista,
                  as: 'artista', // Use o alias correto definido na associação
                  attributes: ['id', 'nome'] // Apenas os campos necessários
              }
          ]
      });

      res.render('discos', { discos });
  } catch (error) {
      console.error(error);  // Adiciona o log para depuração
      res.status(500).send('Erro ao listar discos');
  }
};

// Disco específico
const getDiscoById = async (req, res) => {
    const { id } = req.params; // Obtém o ID do disco da rota
    try {
      // Busca o disco pelo ID e inclui as faixas associadas, utilizando o alias 'faixas'
      const disco = await Disco.findByPk(id, {
        include: [
          {
            model: Faixa, // Inclui o modelo Faixa
            as: 'faixas',  // Alias para incluir as faixas
            attributes: ['titulo'], // Busca apenas o campo 'titulo' de cada faixa
          },
        ],
      });
  
      if (!disco) {
        return res.status(404).send('Disco não encontrado');
      }
  
      // Renderiza a view passando o disco e suas faixas
      res.render('disco', { disco });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar o disco');
    }
  };
  
  

// Exibir formulário para adicionar novo disco
const renderAddDiscoForm = (req, res) => {
    res.render('discosAdd');
};

// Adicionar um novo disco
const addDisco = async (req, res) => {
    const { titulo, ano_lancamento } = req.body;
    const faixas = req.body.faixas || [];
  
    try {
      // Criar o disco primeiro, incluindo o ano de lançamento
      const disco = await Disco.create({ 
        titulo, 
        ano_lancamento 
      });
  
      // Criar as faixas associadas ao disco
      const faixasToCreate = faixas.map(faixaTitulo => ({
        titulo: faixaTitulo,
        discoId: disco.id,
      }));
  
      if (faixasToCreate.length > 0) {
        await Faixa.bulkCreate(faixasToCreate); // Cria todas as faixas de uma vez
      }
  
      // Redirecionar para a página de discos
      res.redirect('/discos');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao adicionar disco e faixas');
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
