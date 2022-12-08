module.exports = (sequelize, dataTypes) => {
  let alias = "Products"; //cambio a plural

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
    image: {
      type: dataTypes.STRING(300),
    },
  };

  let config = {
    tableName: "products",
    timestamps: false,
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.belongsTo(models.Brands, {
      foreignKey: "brand_id",
      as: "brand",
    });

    Product.belongsTo(models.Subcategories, {
      as: "subcategory",
      foreignKey: "subcategory_id",
    });

    Product.belongsToMany(models.Images, {
      as: "images",
      through: "products_images",
      foreignKey: "products_id",
      otherKey: "images_id",
      timeStamps: false,
    });

    Product.belongsToMany(models.Orders, {
      as: "orders",
      through: "products_orders",
      foreignKey: "products_id",
      otherKey: "orders_id",
      timeStamps: false,
    });
  };

  return Product;
};
