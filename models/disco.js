'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Disco.belongsTo(models.Artista, {foreignKey: 'id_artista' })
    }
  }
  Disco.init({
    titulo: DataTypes.STRING,
    ano_lancamento: DataTypes.INTEGER,
    capa: DataTypes.STRING,
    id_artista: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Disco',
  });
  return Disco;
};