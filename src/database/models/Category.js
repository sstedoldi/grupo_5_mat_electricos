module.exports = (sequelize, dataTypes) => {
  let alias = "Categories"; //cambio a plural

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
    tableName: "categories",
    timestamps: false,
  };

  const Category = sequelize.define(alias, cols, config);

  Category.associate = function (models) {
    Category.hasMany(models.Products, {
      as: "products",
      foreignKey: "category_id",
    });
    // Category.hasMany(models.Subcategories, {
    //   as: "subcategories",
    //   foreignKey: "category_id",
    // });
  };

  return Category;
};
