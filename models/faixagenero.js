'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FaixaGenero extends Model {
    static associate(models) {
      // Campo para adicionar associações futuras.
    }
  }

  FaixaGenero.init({
    faixaId: DataTypes.INTEGER,
    generoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FaixaGenero',
  });
  return FaixaGenero;
};