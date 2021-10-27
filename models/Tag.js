const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    tagName:{
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'tag',
  }
);

module.exports = Tag;
