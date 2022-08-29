//Data managing
const categories = [];
const products = [];

//Controller definition
const categoriesController = {
  list: (req, res) => {
    //Codigo para tomar categoria elegida y filtrar productos
    let category; //Object
    let productsFiltered = []; //Object list
    res.render("productCategory", category, productsFiltered);
  },
};

////
module.exports = categoriesController;
