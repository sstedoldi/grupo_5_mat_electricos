module.exports = (sequelize, dataTypes) => {
  let alias = "Images"; //cambio a plural

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
    url: {
      allowNull: false,
      type: dataTypes.TEXT,
    },
  };

  let config = {
    tableName: "images",
    timestamps: false,
  };

  const Image = sequelize.define(alias, cols, config);

  Image.associate = function (models) {
    Image.belongsToMany(models.Products, {
      as: "products",
      through: "products_images",
      foreignKey: "images_id",
      otherKey: "products_id",
      timeStamps: false,
    });
  };

  return Image;
};
