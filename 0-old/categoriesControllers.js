////Primary modules
const fs = require("fs");
const path = require("path");

//Data managing
const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

//REGEX of thousand
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Controller definition
const categoriesController = {
  index: (req, res) => {
    //Codigo para tomar categoria elegida y filtrar productos
    let category; //Object
    let productsFiltered = []; //Object list
    res.render("productCategory", category, productsFiltered);
  },
};

////
module.exports = categoriesController;
