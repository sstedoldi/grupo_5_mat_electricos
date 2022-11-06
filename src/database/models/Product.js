const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {
  let alias = "Product";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: dataTypes.STRING,
    },
  };

  config = {
    tableName: "products",
    timestamps: false,
  };

  const Product = sequelize.define(alias, cols, config);

  return Product;
};
