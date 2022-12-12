////Primary modules
const fs = require("fs");
const path = require("path");

//Data managing
// const productsFilePath = path.join(__dirname, "../data/mat_elec_products.json");
// const productsFilePath = path.join(__dirname, "../data/products.json");
// const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

let db = require("../database/models");
const Op = db.Sequelize.Op;

//REGEX of thousand
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Controller definition
const productsController = {
  //lista todos los productos
  index: (req, res) => {
    db.Products.findAll({
      include: ["category", "subcategory", "brand"],
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
      include: ["category", "subcategory", "brand"],
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
    (req.image = req.file ? req.file.filename : "default-image.png"),
      db.Products.create({
        name: req.body.name,
        description: req.body.description,
        vat: req.body.vat,
        nonvatPrice: req.body.nonvatPrice,
        discount: req.body.discount,
        category_id: req.body.category_id,
        subcategory_id: req.body.subcategory_id,
        brand_id: req.body.brand_id,
        stock: req.body.stock,
        stock_min: req.body.stock_min,
        image: req.image,
      })
        .then(() => {
          console.log("producto creado");
          return res.redirect("/products/");
        })
        .catch((error) => res.send(error));
  },
  //
  //
  edit: (req, res) => {
    //busco el producto a editar
    let idProduct = req.params.id;
    let productToEdit = db.Products.findByPk(idProduct, {
      include: ["brand", "category", "subcategory"],
      raw: true,
      nest: true,
    });
    //llevo categories, subcategories y brands al formulario del edit
    let categories = db.Categories.findAll();
    let subcategories = db.Subcategories.findAll();
    let brands = db.Brands.findAll();

    Promise.all([productToEdit, categories, subcategories, brands])
      .then(([productToEdit, categories, subcategories, brands]) => {
        res.render("productEdit", {
          productToEdit,
          categories,
          subcategories,
          brands,
        });
      })
      .catch((error) => res.send(error));
  },
  //
  //
  update: async (req, res) => {
    let idProduct = req.params.id;
    //provisorio, para cambiar imagen
    // db.Products.findByPk(idProduct, {})
    //   .then((productToEdit) => {
    //     req.image = req.file ? req.file.filename : productToEdit.image;
    //   })
    //   .catch((error) => res.send(error));
    // //
    // console.log(req.image);
    let category = await db.Categories.findByPk(req.body.category_id);
    // console.log(category);
    // console.log(req.body.category_id);
    
    db.Products.update(
      {
        name: req.body.name,
        description: req.body.description,
        vat: req.body.vat,
        nonvatPrice: req.body.nonvatPrice,
        discount: req.body.discount,
        category_id: req.body.category_id,
        subcategory_id: req.body.subcategory_id,
        brand_id: req.body.brand_id,
        stock: req.body.stock,
        stock_min: req.body.stock_min,
        image: req.file
          ? req.file.filename
          : `img-default-${category.name.toLowerCase().replace(" ", "_")}.jpg`,
      },
      {
        where: { id: idProduct },
      }
    )
      .then(() => {
        console.log("producto editado");
        return res.redirect("/products/productDetail/" + idProduct);
      })
      .catch((error) => res.send(error));
  },
  //
  //
  delete: (req, res) => {
    let idProduct = req.params.id;
    db.Products.destroy({ where: { id: idProduct } })
      .then(() => {
        console.log("producto eliminado");
        return res.redirect("/products/");
      })
      .catch((error) => res.send(error));
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
    console.log(query);
    db.Products.findAll({
      include: ["category", "subcategory", "brand"],
      raw: true,
      nest: true,
      //filtro solo por description, provisoriamente
      where: { description: { [Op.like]: "%" + query.toUpperCase() + "%" } },
      order: [["id", "ASC"]],
      limit: 20, //provisorio, hasta agregar el offset
    })
      .then((productsFound) => {
        res.render("productSearch", {
          query,
          productsFound,
          toThousand,
        });
      })
      .catch((error) => res.send(error));

    // let productsFiltered = db.Products.filter(({ product }) => {
    //   [
    //     product.category.includes(query) ||
    //       product.subcategory.includes(query) ||
    //       product.description.includes(query) ||
    //       product.brand.includes(query),
    //   ];
    // });
    // res.render("productSearch", {
    //   query,
    //   productsFiltered,
    //   toThousand,
    // });
  },
};

////
module.exports = productsController;
