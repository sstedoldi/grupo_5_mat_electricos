const { DataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "User";

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
    lastName: {
      allowNull: false,
      type: dataTypes.STRING(75),
    },
    email: {
      allowNull: false,
      type: dataTypes.STRING(75),
    },
    birthDate: {
      allowNull: false,
      type: dataTypes.DATE,
    },
    password: {
      allowNull: false,
      type: dataTypes.CHAR(45),
    },
    adress: {
      allowNull: false,
      type: dataTypes.TEXT,
    },
    image: {
      type: dataTypes.TEXT,
    },
    tax_id: {
      type: dataTypes.STRING(45),
    },
    condition_id: {
      allowNull: false,
      type: dataTypes.INTEGER,
    }
  };

  let config = {
    tableName: "users",
    timestamps: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.hasMany(models.Order, {
      as: "orders",
      foreingKey: "order_id"
    });
    User.belongsTo(models.Condition, {
      as: "condition",
      foreingKey: "condition_id"
    })
  }

  return User;
};
