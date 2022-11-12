module.exports = (sequelize, dataTypes) => {
  let alias = "Category";

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
    Category.hasMany(models.Subcategory, {
      as: "subcategories",
      foreingKey: "category_id"
    })
  }

  return Category;
};
