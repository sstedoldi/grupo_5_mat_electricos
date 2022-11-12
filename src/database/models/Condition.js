const { DataTypes } = require("sequelize");


module.exports = (sequelize, dataTypes) => {
  let alias = "Condition";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    condition: {
      allowNull: false,
      type: dataTypes.TINYINT,
    },
  };

  let config = {
    tableName: "conditions",
    timestamps: false,
  };

  const Condition = sequelize.define(alias, cols, config);

  Condition.associate = function (models) {
    Condition.hasMany(models.User, {
      as: "users",
      foreingKey: "condition_id"
    })
  }

  return Condition;
};
