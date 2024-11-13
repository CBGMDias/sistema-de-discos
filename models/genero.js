'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Associação com Artista
      Genero.belongsToMany(models.Artista, {
        through: models.ArtistaGenero,
        foreignKey: 'id_genero',
        otherKey: 'id_artista'
      });

      // Associação com Faixa
      Genero.belongsToMany(models.Faixa, {
        through: models.FaixaGenero,
        foreignKey: 'id_genero',
        otherKey: 'id_faixa'
      });
    }
  }
  Genero.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genero',
  });
  return Genero;
};