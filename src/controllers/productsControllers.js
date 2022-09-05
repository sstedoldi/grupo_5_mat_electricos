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
    console.log(req.file);
    console.log(req.body);
    // Do the magic
    let newProduct = {
      id: products[products.length - 1].id + 1,
      name: req.body.name,
      nonvatPrice: req.body.nonvatPrice,
      discount: req.body.discount,
      category: req.body.category,
      subcategory: req.body.subcategory,
      description: req.body.description,
      image: req.file ? req.file.filename : "default-image.png",
    };
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
    res.redirect("/products/");
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
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == parseInt(req.params.id)) {
        products.splice(i, 1);
      }
    }
    let products1 = JSON.stringify(products); //agrego let
    fs.writeFileSync(productsFilePath, products1);

    let products2 = JSON.parse(fs.readFileSync(productsFilePath, "utf-8")); //agrego let

    res.render("products", { products: products2 });
  },

  ////
  cart: (req, res) => {
    res.render("productCart");
  },
  ////
  search: (req, res) => {
    let query = req.query.search;
    let productsFiltered = products.filter((product) => {
      return (
        product.category.includes(query) ||
        product.subcategory.includes(query) ||
        product.description.includes(query) ||
        product.brand.includes(query)
      );
    });
    res.render("productSearch", {
      query,
      productsFiltered,
      toThousand,
    });
  },
};

////
module.exports = productsController;
