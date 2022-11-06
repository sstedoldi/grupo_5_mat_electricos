const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {
  let alias = "Subcategories";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: dataTypes.STRING(45),
    },
  };

  config = {
    tableName: "subcategories",
    timestamps: false,
  };

  const Subcategory = sequelize.define(alias, cols, config);

  return Subcategory;
};
