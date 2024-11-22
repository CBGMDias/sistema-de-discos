'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Artista extends Model {
    static associate(models) {
      // Associação com Genero através de ArtistaGenero
      Artista.belongsToMany(models.Genero, {
        through: models.ArtistaGenero,
        foreignKey: 'artistaId',
        otherKey: 'generoId'
      });

      // Caso precise associar o artista ao disco
      Artista.hasMany(models.Disco, {
        foreignKey: 'artistaId',
        as: 'discos'
      });
    }
  }

  Artista.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nacionalidade: DataTypes.STRING,
    genero_musical: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artista',
    tableName: 'Artista',
  });

  return Artista;
};