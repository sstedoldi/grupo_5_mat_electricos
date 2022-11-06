const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {
  let alias = "Categories";

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
    tableName: "categories",
    timestamps: false,
  };

  const Category = sequelize.define(alias, cols, config);

  return Category;
};
