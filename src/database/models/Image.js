const { sequelize } = require(".");

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
      }
  };

  let config = {
    tableName: "images",
    timestamps: false,
  };

  const Image = sequelize.define(alias, cols, config);

  return Image;
};
