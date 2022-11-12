const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {
  let alias = "Subcategory";

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
    tableName: "subcategories",
    timestamps: false,
  };

  const Subcategory = sequelize.define(alias, cols, config);

  // Subcategory.associate = function (models) {
  //   Subcategory.hasMany(models.Product, {
  //     as: "products",
  //     foreingKey: "subcategory_id"
  //   });
  //   Subcategory.belongsTo(models.Category, {
  //     as: "category",
  //     foreingKey: "category_id"
  //   })
  // }

  return Subcategory;
};
