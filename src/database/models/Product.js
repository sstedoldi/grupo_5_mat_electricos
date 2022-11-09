module.exports = (sequelize, dataTypes) => {
  let alias = "Product";

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
    description: {
      allowNull: false,
      type: dataTypes.TEXT,
    },
    price: {
      allowNull: false,
      type: dataTypes.FLOAT,
    },
    discount: {
      type: dataTypes.INTEGER,
    },
    subcategory_id: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    brand_id: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    stock: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    stock_min: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "products",
    timestamps: false,
  };

  const Product = sequelize.define(alias, cols, config);

  return Product;
};
