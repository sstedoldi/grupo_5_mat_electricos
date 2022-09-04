//Primary modules
const express = require("express");
const path = require("path");

const methodOverride = require("method-override"); //to use put & delete in html

//App instance
const app = express();

//Settings
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method")); //to use put & delete in html
//to use data from forms:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Server
const port = 3000;
app.listen(port, () => console.log("Servidor corriendo en puerto ", 3000));

//Routes
const mainRoutes = require("./routes/mainRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");
// const categoriesRoutes = require("./routes/categoriesRoutes.js");
// const brandsRoutes = require("./routes/brandsRoutes.js");

//Views
app.use("/", mainRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
// app.use("/categories", categoriesRoutes);
// app.use("/brands", brandsRoutes);
