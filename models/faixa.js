'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faixa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Pertence a Disco
      Faixa.belongsTo(models.Disco, {foreignKey: 'id_disco'})

      // Associação com Genero através do ArtistaGenero
      Faixa.belongsToMany(models.Genero, {
        through: models.FaixaGenero,
        foreignKey: 'id_faixa',
        otherKey: 'id_genero'
      })
    }

  }
  Faixa.init({
    titulo: DataTypes.STRING,
    id_disco: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Faixa',
  });
  return Faixa;
};