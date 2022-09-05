//Data managing
products = [];

//Controller definition
const productsController = {
  //lista todos los productos
  index: (req, res) => {
    res.send("listar productos");
  },
  detail: (req, res) => {
    //muestra el detalle de un producto
    let id = req.params.id;
    let product = products.find((oneProduct) => oneProduct.id == id);
    res.render("productDetail", {
      product,
      toThousand,
    });
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
