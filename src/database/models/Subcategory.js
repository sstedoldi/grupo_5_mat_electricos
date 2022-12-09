module.exports = (sequelize, dataTypes) => {
  let alias = "Subcategories"; //cambio a plural

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
    category_id: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "subcategories",
    timestamps: false,
  };

  const Subcategory = sequelize.define(alias, cols, config);

  Subcategory.associate = function (models) {
    Subcategory.hasMany(models.Products, {
      as: "products",
      foreignKey: "subcategory_id",
    });
    // Subcategory.belongsTo(models.Categories, {
    //   as: "category",
    //   foreignKey: "category_id",
    // });
  };

  return Subcategory;
};
