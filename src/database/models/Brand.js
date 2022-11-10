const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {
  let alias = "Brand";

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

  let config = {
    tableName: "brands",
    timestamps: false,
  };

  const Brand = sequelize.define(alias, cols, config);

  Brand.associate = function (models) {
    Brand.hasMany(models.Product, {
      as: "products",
      foreingKey: "brand_id"
    })
  }

  return Brand;
};
