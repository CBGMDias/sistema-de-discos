'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Associação com Genero através do ArtistaGenero
      Artista.belongsToMany(models.Genero, {
        through: models.ArtistaGenero,
        foreignKey: 'id_artista',
        otherKey: 'id_genero'
      })
    }
  }
  Artista.init({
    nome: DataTypes.STRING,
    nacionalidade: DataTypes.STRING,
    genero_musical: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artista',
  });
  return Artista;
};