module.exports = (sequelize, dataTypes) => {
  let alias = "Users";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    birthDate: {
      allowNull: false,
      type: dataTypes.DATE,
    },
    password: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    address: {
      allowNull: true,
      type: dataTypes.STRING,
    },
    image: {
      type: dataTypes.STRING,
    },
    tax_id: {
      type: dataTypes.STRING,
    },
    condition_id: {
      allowNull: true,
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "users",
    timestamps: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.hasMany(models.Orders, {
      as: "orders",
      foreignKey: "order_id",
    });
    User.belongsTo(models.Condition, {
      as: "condition",
      foreignKey: "condition_id",
    });
  };

  return User;
};
