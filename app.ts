import * as createError from "http-errors";
import * as express from "express";

import * as compression from "compression";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";

import * as miniShopDB from "@cityssm/mini-shop-db/config";

import * as configFns from "./helpers/configFns";
import * as stringFns from "@cityssm/expressjs-server-js/stringFns";
import * as dateTimeFns from "@cityssm/expressjs-server-js/dateTimeFns";

import * as routerCheckout from "./routes/checkout";
import * as routerOrder from "./routes/order";
import * as routerProducts from "./routes/products";


/*
 * MINI SHOP DB
 */


miniShopDB.setMSSQLConfig(configFns.getProperty("mssqlConfig"));
miniShopDB.setOrderNumberFunction(configFns.getProperty("orderNumberFunction"));
miniShopDB.setProducts(configFns.getProperty("products"));
miniShopDB.setFees(configFns.getProperty("fees"));


/*
 * INITIALIZE APP
 */


const app = express();

if (!configFns.getProperty("reverseProxy.disableEtag")) {
  app.set("etag", false);
}

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

if (!configFns.getProperty("reverseProxy.disableCompression")) {
  app.use(compression());
}

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());


/*
 * STATIC ROUTES
 */


const urlPrefix = configFns.getProperty("reverseProxy.urlPrefix");


app.use(urlPrefix, express.static(path.join(__dirname, "public")));

app.use(urlPrefix + "/lib/bulma-webapp-js",
  express.static(path.join(__dirname, "node_modules", "@cityssm", "bulma-webapp-js", "dist")));

app.use(urlPrefix + "/lib/fontawesome-free",
  express.static(path.join(__dirname, "node_modules", "@fortawesome", "fontawesome-free")));

app.use(urlPrefix + "/lib/formToObject",
  express.static(path.join(__dirname, "node_modules", "form_to_object", "dist")));

app.use(urlPrefix + "/lib/typeface-barlow",
  express.static(path.join(__dirname, "node_modules", "@openfonts", "barlow_all", "files")));


/*
 * ROUTES
 */


// Make config objects available to the templates
app.use(function(_req, res, next) {
  res.locals.configFns = configFns;
  res.locals.dateTimeFns = dateTimeFns;
  res.locals.stringFns = stringFns;
  res.locals.urlPrefix = configFns.getProperty("reverseProxy.urlPrefix");
  res.locals.pageTitle = "";
  next();
});


app.all(urlPrefix + "/", function(_req, res) {
  res.redirect(urlPrefix + "/products");
});

app.use(urlPrefix + "/checkout", routerCheckout);
app.use(urlPrefix + "/order", routerOrder);
app.use(urlPrefix + "/products", routerProducts);


// Catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});


// Error handler
app.use(function(err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) {

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");

});


export = app;
