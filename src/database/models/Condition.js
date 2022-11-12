<<<<<<< HEAD
const { DataTypes } = require("sequelize");


=======
>>>>>>> 971ce2513001922ba9c185bc026a21fd074a0f67
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
      foreingKey: "condition_id",
    });
  };

  return Condition;
};
