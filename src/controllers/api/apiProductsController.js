let db = require("../../database/models");
const Op = db.Sequelize.Op;

//Controller api definition
const apiProductsController = {
  //
  //lista todos los productos
  products: (req, res) => {
    db.Products.findAll({
      include: ["category", "subcategory", "brand"],
      limit: 20, //provisorio
      order: [["id", "ASC"]],
    })
      .then((products) => {
        return res.status(200).json({
          total: products.length,
          data: products,
          status: 200,
        });
      })
      .catch((error) => res.send(error));
  },
  //
  //Detalla de un producto
  productsId: (req, res) => {
    let idProduct = req.params.id;
    db.Products.findByPk(idProduct, {
      include: ["brand", "category", "subcategory"],
      raw: true,
      nest: true,
    })
      .then((product) => {
        return res.status(200).json({
          data: product,
          status: 200,
        });
      })
      .catch((error) => res.send(error));
  },
  //
  //Ultimo producto agregado
  lastProduct: (req, res) => {
    db.Products.findAll({
      include: ["category", "subcategory", "brand"],
      limit: 1,
      order: [["id", "DESC"]],
    })
      .then((product) => {
        return res.status(200).json({
          data: product,
          status: 200,
        });
      })
      .catch((error) => res.send(error));
  },
};

module.exports = apiProductsController;
