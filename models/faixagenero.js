'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FaixaGenero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FaixaGenero.init({
    id_faixa: DataTypes.INTEGER,
    id_genero: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FaixaGenero',
  });
  return FaixaGenero;
};