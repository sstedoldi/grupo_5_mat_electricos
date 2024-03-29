////Primary modules
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const path = require("path");
const { validationResult } = require("express-validator");
let db = require("../database/models");
const Op = db.Sequelize.Op;

//REGEX of thousand
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Controller definition
const productsController = {
  //
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
  //lista por categoría
  category: async (req, res) => {
    let idCategory = req.params.id;
    let category = await db.Categories.findByPk(idCategory);

    db.Products.findAll({
      include: ["category", "subcategory", "brand"],
      raw: true,
      nest: true,
      where: { category_id: idCategory },
      order: [["id", "ASC"]],
      limit: 20, //provisorio, hasta agregar el offset
    })
      .then((products) => {
        res.render("category", {
          category,
          products,
          toThousand,
        });
      })
      .catch((error) => res.send(error));
  },
  //
  //detalle de un producto
  detail: (req, res) => {
    let id = req.params.id;
    console.log(id);
    db.Products.findByPk(id, {
      include: ["category", "subcategory", "brand"],
      raw: true,
      nest: true,
    }).then((products) => {
      res.render("productDetail", {
        products,
        toThousand,
      });
    });
  },
  //
  //formulario de creación
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
  //almacenamiento de producto
  store: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
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
    } else {
      let categories = db.Categories.findAll();
      let subcategories = db.Subcategories.findAll();
      let brands = db.Brands.findAll();
      Promise.all([categories, subcategories, brands])
        .then(([categories, subcategories, brands]) => {
          const oldData = req.body;
          res.render("productCreate", {
            errors: errors.mapped(),
            oldData: oldData,
            categories,
            subcategories,
            brands,
          });
        })
        .catch((error) => res.send(error));
    }
  },
  //
  //formulario de edición de producto
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
  //edición de producto
  update: async (req, res) => {
    let errors = validationResult(req);
    let idProduct = req.params.id;
    let category = await db.Categories.findByPk(req.body.category_id);

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
  //eliminación de producto
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
  //busqueda de producto
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
  },
  //
  //FALTA CARRTIO
  cart: (req, res) => {
    res.render("productCart");
  },
};

////
module.exports = productsController;
