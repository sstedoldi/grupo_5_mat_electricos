
let db = require("../../database/models");
const Op = db.Sequelize.Op;

//Controller api definition
const apiProductsController = {
  //lista todos los productos
  products: (req, res) => {
    db.Products.findAll()
    .then(products => {
     return res.status(200).json({
        total: products.length,
        data: products,
        status: 200,
      });
    });
  },
    productsId: (req, res) => {
      db.Products.findByPk(req.params.id)
      .then(product => {
       return res.status(200).json({
          data: product,
          status: 200,
        });
      });
  }}

module.exports = apiProductsController;
