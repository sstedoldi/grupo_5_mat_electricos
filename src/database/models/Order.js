const { DataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "Order";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    ammount: {
      allowNull: false,
      type: dataTypes.DECIMAL,
    },
    shipping: {
      allowNull: false,
      type: dataTypes.TINYINT,
    },
    shipping_addres: {
      type: dataTypes.TEXT,
    },
    order_status: {
      allowNull: false,
      type: dataTypes.TINYINT,
    },
    billing: {
      allowNull: false,
      type: dataTypes.TINYINT,
    }
  };

  let config = {
    tableName: "orders",
    timestamps: true,
  };

  const Order = sequelize.define(alias, cols, config);

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      as: "user",
      foreingKey: "user_id"
    });
    Order.belongsToMany(models.Product, {
      as: "products",
      through: "products_images",
      foreingKey: "orders_id",
      otherKey: "products_id",
      timeStamps: false
    })
  }

  return Order;
};