////Primary modules
const fs = require("fs");
const path = require("path");

//Data managing
// const productsFilePath = path.join(__dirname, "../data/mat_elec_products.json");
// const productsFilePath = path.join(__dirname, "../data/products.json");
// const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

let db = require("../database/models");

//REGEX of thousand
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Controller definition
const productsController = {
  //lista todos los productos
  index: (req, res) => {
    db.Products.findAll({
      include: ["brand", "subcategory", "images"], //FALTA VINCULAR CATEGORIES
      raw: true,
      nest: true,
      limit: 20, //provisorio, hasta agregar el offset
    }).then((products) => {
      res.render("products", {
        products,
        toThousand,
      });
    });
  },
  //
  //
  detail: (req, res) => {
    let id = req.params.id;
    db.Products.findByPk(id, {
      include: ["brand", "subcategory", "images"], //FALTA VINCULAR CATEGORIES
      raw: true,
      nest: true,
    }).then((product) => {
      res.render("productDetail", {
        product,
        toThousand,
      });
    });
  },
  //
  //
  create: (req, res) => {
    //llevo categories, subcategories y brands al formulario de create
    let categories = db.Categories.findAll();
    let subcategories = db.Subcategories.findAll();
    let brands = db.Brands.findAll();
    Promise.all([categories, subcategories, brands])
      .then(([categories, subcategories, brands]) => {
        res.render("productCreate", { categories, subcategories, brands });
      })
      .catch((error) => res.send(error));
  },
  //
  //
  store: (req, res) => {
    db.Products.create({
      ...req.body,
      image: req.file
        ? req.file.filename
        : "img-default-" + req.body.category_id.toLowerCase() + ".jpg",
    })
      .then(() => {
        console.log("producto creado");
        return res.redirect("/products/");
      })
      .catch((error) => res.send(error));
  },
  //
  //
  //HASTA ACÁ
  edit: (req, res) => {
    let id = req.params.id;
    let productToEdit = products.find((oneProduct) => oneProduct.id == id);

    res.render("productEdit", {
      productToEdit,
    });
  },
  //
  //
  update: (req, res) => {
    let id = req.params.id;
    let productToEdit = products.find((product) => product.id == id);
    productToEdit = {
      id: productToEdit.id,
      ...req.body,
      image: productToEdit.image,
    };

    let newProducts = products.map((product) => {
      //nueva variable con todos los productos + el editado
      if (product.id == productToEdit.id) {
        return (product = { ...productToEdit });
      }
      return product;
    });
    fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, " "));
    res.redirect("/products/");
  },
  //
  //
  delete: (req, res) => {
    let id = req.params.id;
    let finalProducts = products.filter((product) => product.id != id);
    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(finalProducts, null, " ")
    );
    res.redirect("/products/"); //hacia una ruta
  },
  //
  //
  cart: (req, res) => {
    res.render("productCart");
  },
  //
  //
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
