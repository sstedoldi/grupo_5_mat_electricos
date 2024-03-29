////Primary modules
const fs = require("fs");
const path = require("path");

//Data managing
// const productsFilePath = path.join(__dirname, "../data/products.json");
// const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

//REGEX of thousand
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Controller definition
const mainController = {
  home: (req, res) => {
    res.render("home", {
      // products,
      toThousand,
    });
  },
  quienes: (req, res) => {
    res.render("quienesSomos.ejs");
  },
  analytics: (req, res) => {
    res.send("Acá va el dashboard del negocio");
    //FALTA
  },
};

////
module.exports = mainController;
