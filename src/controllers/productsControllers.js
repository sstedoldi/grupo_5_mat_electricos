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
  //lista todos los productos
  index: (req, res) => {
    res.render("products", {
      products,
      toThousand,
    });
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
		let newProduct={
			id: products[products.length - 1].id + 1,
			name: req.body.name,
			nonvatPrice: req.body.nonvatPrice,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image:req.file? req.file.filename : "default-image.png"
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products/');
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
