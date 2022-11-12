module.exports = (sequelize, dataTypes) => {
  let alias = "Brand";

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
  };

  let config = {
    tableName: "brands",
    timestamps: false,
  };

  const Brand = sequelize.define(alias, cols, config);

<<<<<<< HEAD
  // Brand.associate = function (models) {
  //   Brand.hasMany(models.Product, {
  //     as: "products",
  //     foreingKey: "brand_id"
  //   })
  // }
=======
  Brand.associate = function (models) {
    Brand.hasMany(models.Product, {
      as: "products",
      foreingKey: "brand_id",
    });
  };
>>>>>>> 971ce2513001922ba9c185bc026a21fd074a0f67

  return Brand;
};
