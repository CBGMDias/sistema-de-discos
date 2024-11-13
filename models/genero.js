'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genero extends Model {
    static associate(models) {

      // Associação com Artista através de ArtistaGenero
      Genero.belongsToMany(models.Artista, {
        through: models.ArtistaGenero,
        foreignKey: 'generoId',
        otherKey: 'artistaId'
      });

      // ASsociação com Faixa através de FaixaGenero
      Genero.belongsToMany(models.Faixa, {
        through: models.FaixaGenero,
        foreignKey: 'generoId',
        otherKey: 'faixaId'
      });
    }
  }

  Genero.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Genero',
  });
  return Genero;
};