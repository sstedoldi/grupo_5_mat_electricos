<<<<<<< HEAD


=======
>>>>>>> 971ce2513001922ba9c185bc026a21fd074a0f67
module.exports = (sequelize, dataTypes) => {
  let alias = "Image";

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
    Image.belongsToMany(models.Product, {
      as: "products",
      through: "products_images",
      foreingKey: "images_id",
      otherKey: "products_id",
      timeStamps: false,
    });
  };

  return Image;
};
