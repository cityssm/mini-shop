"use strict";
const createError = require("http-errors");
const express = require("express");
const compression = require("compression");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const miniShopDB = require("@cityssm/mini-shop-db/config");
const configFns = require("./helpers/configFns");
const stringFns = require("@cityssm/expressjs-server-js/stringFns");
const dateTimeFns = require("@cityssm/expressjs-server-js/dateTimeFns");
const routerCheckout = require("./routes/checkout");
const routerOrder = require("./routes/order");
const routerProducts = require("./routes/products");
miniShopDB.setMSSQLConfig(configFns.getProperty("mssqlConfig"));
miniShopDB.setOrderNumberFunction(configFns.getProperty("orderNumberFunction"));
miniShopDB.setProducts(configFns.getProperty("products"));
miniShopDB.setFees(configFns.getProperty("fees"));
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/lib/bulma-webapp-js", express.static(path.join(__dirname, "node_modules", "@cityssm", "bulma-webapp-js", "dist")));
app.use("/lib/fontawesome-free", express.static(path.join(__dirname, "node_modules", "@fortawesome", "fontawesome-free")));
app.use("/lib/formToObject", express.static(path.join(__dirname, "node_modules", "form_to_object", "dist")));
app.use("/lib/typeface-barlow", express.static(path.join(__dirname, "node_modules", "@openfonts", "barlow_all", "files")));
app.use(function (_req, res, next) {
    res.locals.configFns = configFns;
    res.locals.dateTimeFns = dateTimeFns;
    res.locals.stringFns = stringFns;
    next();
});
app.all("/", function (_req, res) {
    res.redirect("/products");
});
app.use("/checkout", routerCheckout);
app.use("/order", routerOrder);
app.use("/products", routerProducts);
app.use(function (_req, _res, next) {
    next(createError(404));
});
app.use(function (err, req, res, _next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});
module.exports = app;
