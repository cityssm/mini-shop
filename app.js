"use strict";
const createError = require("http-errors");
const express = require("express");
const express_abuse_points_1 = require("@cityssm/express-abuse-points");
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
if (!configFns.getProperty("reverseProxy.disableEtag")) {
    app.set("etag", false);
}
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_abuse_points_1.abuseCheck());
if (!configFns.getProperty("reverseProxy.disableCompression")) {
    app.use(compression());
}
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
const urlPrefix = configFns.getProperty("reverseProxy.urlPrefix");
app.use(urlPrefix, express.static(path.join(__dirname, "public")));
app.use(urlPrefix + "/lib/bulma-webapp-js", express.static(path.join(__dirname, "node_modules", "@cityssm", "bulma-webapp-js", "dist")));
app.use(urlPrefix + "/lib/fontawesome-free", express.static(path.join(__dirname, "node_modules", "@fortawesome", "fontawesome-free")));
app.use(urlPrefix + "/lib/formToObject", express.static(path.join(__dirname, "node_modules", "form_to_object", "dist")));
app.use(urlPrefix + "/lib/typeface-barlow", express.static(path.join(__dirname, "node_modules", "@openfonts", "barlow_all", "files")));
app.use(function (_req, res, next) {
    res.locals.configFns = configFns;
    res.locals.dateTimeFns = dateTimeFns;
    res.locals.stringFns = stringFns;
    res.locals.urlPrefix = configFns.getProperty("reverseProxy.urlPrefix");
    res.locals.pageTitle = "";
    next();
});
app.all(urlPrefix + "/", function (_req, res) {
    res.redirect(urlPrefix + "/products");
});
app.use(urlPrefix + "/checkout", routerCheckout);
app.use(urlPrefix + "/order", routerOrder);
app.use(urlPrefix + "/products", routerProducts);
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
