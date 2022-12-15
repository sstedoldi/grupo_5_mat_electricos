const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Products = db.Products;
const Categories = db.Categories;
//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const apiCategoriesController = {
    list: (req, res) => {
        db.Categories.findAll()
        .then(categories => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: categories.length,
                    url: "localhost:3000/categories"
                },
                data: categories
            }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
        db.Categories.findByPk(req.params.id)
            .then(categories => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: categories.length,
                        url: "localhost:3000/categories/detail/2"
                    },
                    data: categories
                }
                res.json(respuesta);
            });
    },
    // 'genreMovies': (req, res) => {
    //     db.Genre.findByPk(req.params.id,{
    //         include: ['movies']
    //     })
    //         .then(genre => {
    //             let respuesta = {
    //                 meta: {
    //                     status: 200,
    //                     total: genre.length,
    //                     url: '/api/genre/:id/movies'
    //                 },
    //                 data: genre
    //             }
    //             res.json(respuesta);
    //         });
    //}
}

module.exports = apiCategoriesController;