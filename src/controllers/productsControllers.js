////Primary modules
const fs = require("fs");
const path = require("path");

//Data managing
const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

//REGEX of thousand
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Controller definition
const productsController = {
  index: (req, res) => {
    res.render("products", {
      products,
      toThousand,
    });
  },
  detail: (req, res) => {
    const idProduct = req.params.id;
    res.render("productDetail", products[idProduct]);
  },
  create: (req, res) => {
    res.render("productCreate");
  },
  store: (req, res) => {
    res.send("guardado de producto");
  },
  edit: (req, res) => {
    const idProduct = req.params.id;
    res.send("modificar de producto" + idProduct);
  },
  update: (req, res) => {
    const idProduct = req.params.id;
    res.send("modificar de producto" + idProduct);
  },
  delete: (req, res) => {
    const idProduct = req.params.id;
    res.send("borrado del producto" + idProduct);
  },

  ////
  cart: (req, res) => {
    res.render("productCart");
  },
};

////
module.exports = productsController;
