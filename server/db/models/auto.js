'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auto extends Model {
     static associate({User}) {
      this.belongsTo(User, {foreignKey: 'userId'});
    }
  }
  Auto.init({
    userId: DataTypes.INTEGER,
    modelCar: DataTypes.STRING,
    yearCar: DataTypes.STRING,
    mileage: DataTypes.STRING,
    cost: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Auto',
  });
  return Auto;
};