const { sequelize } = require(".");

      /*&&&&&&&&&&&&
 REVISAR NOMBRE DEL MODELO.
        &&&&&&&&&&&*/


module.exports = (sequelize, dataTypes) => {
  let alias = "products_images";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    products_id: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    images_id: {
        allowNull: false,
        type: dataTypes.INTEGER,
      }
  };

  let config = {
    tableName: "products_images",
    timestamps: false,
  };

  const products_images = sequelize.define(alias, cols, config);

  return products_images;
};
