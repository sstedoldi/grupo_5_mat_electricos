module.exports = (sequelize, dataTypes) => {
  let alias = "Product";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    name: {
      allowNull: true,
      type: dataTypes.STRING(45),
    },
    description: {
      allowNull: false,
      type: dataTypes.TEXT,
    },
    vat: {
      allowNull: false,
      type: dataTypes.FLOAT,
    },
    nonvatPrice: {
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

  Product.associate = function (models) {
   /* Product.belongsTo(models.Brand, {
      as: "brand",
      foreingKey: "brand_id"
    });*/
   /* Product.belongsTo(models.Subcategory, {
      as: "subcategory",
      foreingKey: "subcategory_id"
    });*/

    Product.belongsToMany(models.Image, {
      as: "images",
      through: "products_images",
      foreingKey: "products_id",
      otherKey: "images_id",
      timeStamps: false,
    });
    Product.belongsToMany(models.Order, {
      as: "orders",
      through: "products_images",
      foreingKey: "products_id",
      otherKey: "orders_id",
      timeStamps: false,
    });
  };

  return Product;
};
