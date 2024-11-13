'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Disco extends Model {
    static associate(models) {

      // Associação com Artista
      Disco.belongsTo(models.Artista, { 
        foreignKey: 'artistaId' 
      });
    }
  }

  Disco.init({
    titulo: DataTypes.STRING,
    ano_lancamento: DataTypes.INTEGER,
    capa: DataTypes.STRING,
    artistaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Disco',
  });
  return Disco;
};