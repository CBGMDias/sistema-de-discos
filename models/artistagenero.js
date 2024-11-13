'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ArtistaGenero extends Model {
    static associate(models) {
      // Campo para adicionar associações futuras.
    }
  }

  ArtistaGenero.init({
    artistaId: DataTypes.INTEGER,
    generoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArtistaGenero',
  });
  return ArtistaGenero;
};