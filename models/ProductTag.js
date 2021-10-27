const { Model } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
