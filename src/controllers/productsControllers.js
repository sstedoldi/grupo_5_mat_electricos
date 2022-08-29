//Data managing

//Controller definition
const productsController = {
  detail: (req, res) => {
    //Debe usar id producto y enviar su información
    res.render("productDetail");
  },
  cart: (req, res) => {
    res.render("productCart");
  },
};

////
module.exports = productsController;
