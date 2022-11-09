const { sequelize } = require(".");

      /*&&&&&&&&&&&&
 REVISAR NOMBRE DEL MODELO.
        &&&&&&&&&&&*/


module.exports = (sequelize, dataTypes) => {
  let alias = "products_orders";

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
    orders_id: {
        allowNull: false,
        type: dataTypes.INTEGER,
      }
  };

  let config = {
    tableName: "products_orders",
    timestamps: false,
  };

  const products_orders = sequelize.define(alias, cols, config);

  return products_orders;
};