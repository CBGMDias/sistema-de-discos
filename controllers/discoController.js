const { Disco, Faixa, Artista, Genero, FaixaGenero, sequelize } = require('../models');

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
          ],

          order: [['titulo', 'ASC']] // Ordena por titulo
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
const renderAddDiscoForm = async (req, res) => {
  try {
      const generos = await Genero.findAll({
        order: [['nome', 'ASC']] // Ordena em ordem alfabetica
      }); // Busca todos os gêneros cadastrados
      res.render('discosAdd', { generos }); // Passa os gêneros para a view
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o formulário de adição');
    }
};

// Adicionar um novo disco
const addDisco = async (req, res) => {
  const { titulo, ano_lancamento } = req.body;
  const faixas = req.body.faixas || [];
  const faixaGeneros = req.body.faixaGeneros || []; // Aqui, temos um array com os gêneros de cada faixa

  // Substitui separadores de caminho do Windows por '/' e remove 'public/' se necessário
  const capa = req.file ? req.file.path.replace(/\\/g, '/').replace('public/', '') : null;

  try {
    // Criar o disco primeiro, incluindo o ano de lançamento
    const disco = await Disco.create({ 
      titulo, 
      ano_lancamento,
      capa 
    });

    // Criar as faixas associadas ao disco
    const faixasToCreate = faixas.map(faixaTitulo => ({
      titulo: faixaTitulo,
      discoId: disco.id,
    }));

    // Adicionar as faixas
    const faixasCriadas = await Faixa.bulkCreate(faixasToCreate);

    // Associar os gêneros para cada faixa individualmente
    for (let i = 0; i < faixasCriadas.length; i++) {
      const faixa = faixasCriadas[i];
      const generoId = faixaGeneros[i]; // Pega o gênero selecionado para cada faixa

      if (generoId) {
        // Criar a associação na tabela FaixaGenero
        await FaixaGenero.create({
          faixaId: faixa.id,
          generoId: generoId,
        });
      }
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

const fs = require('fs'); // Importar o módulo File System

// Rota para deletar um disco
const deleteDisco = async (req, res) => {
    const method = req.body._method;

    if (method === 'DELETE') {
        try {
            const discoId = req.params.id;

            // Verificar se o disco existe
            const disco = await Disco.findByPk(discoId);

            if (!disco) {
                return res.status(404).send('Disco não encontrado');
            }

            // Excluir as faixas associadas ao disco
            await Faixa.destroy({
                where: { discoId }
            });

            // Excluir a imagem da capa, se existir
            if (disco.capa) {
                fs.unlink(`public/${disco.capa}`, (err) => {
                    if (err) {
                        console.error(`Erro ao excluir a capa do disco: ${err}`);
                    } else {
                        console.log(`Capa excluída: ${disco.capa}`);
                    }
                });
            }

            // Excluir o disco
            await disco.destroy();

            // Redirecionar após exclusão
            return res.redirect('/discos');
        } catch (error) {
            console.error('Erro ao excluir disco:', error);
            return res.status(500).send('Erro ao excluir o disco');
        }
    }

    // Método não permitido
    return res.status(405).send('Método não permitido');
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
