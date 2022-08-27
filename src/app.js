//Primary modules
const express = require("express");
const path = require("path");

//App instance
const app = express();

//settings
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Server
const port = 3000;
app.listen(port, () => console.log("Servidor corriendo en puerto ", 3000));

//Routes
const mainRoutes = require("./routes/mainRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");

//Views
app.use("/", mainRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/home.html"));
// });

// app.get("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/register.html"));
// });

// app.get("/productDetail", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/productDetail.html"));
// });

// app.get("/productCart", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/productCart.html"));
// });

// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/login.html"));
// });

// app.get("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/register.html"));
// });
