//Data managing
const brands = [];
const products = [];

//Controller definition
const brandsController = {
  list: (req, res) => {
    //Codigo para tomar categoria elegida y filtrar productos
    let brand; //Object
    let productsFiltered = []; //Object list
    res.render("productCategory", brand, productsFiltered);
  },
};

////
module.exports = brandsController;
