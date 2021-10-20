import createError from "http-errors";
import express from "express";

import { abuseCheck } from "@cityssm/express-abuse-points";
import compression from "compression";
import path from "path";
import cookieParser from "cookie-parser";

import * as miniShopDB from "@cityssm/mini-shop-db";

import * as configFunctions from "./helpers/configFunctions.js";
import * as stringFns from "@cityssm/expressjs-server-js/stringFns.js";
import * as dateTimeFns from "@cityssm/expressjs-server-js/dateTimeFns.js";

import routerCheckout from "./routes/checkout.js";
import routerOrder from "./routes/order.js";
import routerProducts from "./routes/products.js";

import debug from "debug";
const debugApp = debug("mini-shop:app");

const __dirname = ".";


/*
 * MINI SHOP DB
 */


miniShopDB.setConfig({
  mssqlConfig: configFunctions.getProperty("mssqlConfig"),
  orderNumberFunction: configFunctions.getProperty("orderNumberFunction"),
  products: configFunctions.getProperty("products"),
  fees: configFunctions.getProperty("fees")
});


/*
 * INITIALIZE APP
 */


export const app = express();

if (!configFunctions.getProperty("reverseProxy.disableEtag")) {
  app.set("etag", false);
}

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(abuseCheck({
  byXForwardedFor: configFunctions.getProperty("reverseProxy.blockViaXForwardedFor"),
  byIP: !configFunctions.getProperty("reverseProxy.blockViaXForwardedFor")
}));

if (!configFunctions.getProperty("reverseProxy.disableCompression")) {
  app.use(compression());
}

app.use((request, _response, next) => {
  debugApp(request.method + " " + request.url);
  next();
});

app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());


/*
 * STATIC ROUTES
 */


const urlPrefix = configFunctions.getProperty("reverseProxy.urlPrefix");


app.use(urlPrefix, express.static(path.join(__dirname, "public")));

app.use(urlPrefix + "/lib/bulma-webapp-js",
  express.static(path.join(__dirname, "node_modules", "@cityssm", "bulma-webapp-js", "dist")));

app.use(urlPrefix + "/lib/formToObject",
  express.static(path.join(__dirname, "node_modules", "form_to_object", "dist")));


/*
 * ROUTES
 */


// Make config objects available to the templates
app.use(function(_request, response, next) {
  response.locals.configFunctions = configFunctions;
  response.locals.dateTimeFns = dateTimeFns;
  response.locals.stringFns = stringFns;
  response.locals.urlPrefix = urlPrefix;
  response.locals.pageTitle = "";
  next();
});


app.all(urlPrefix + "/", (_request, response) => {
  response.redirect(urlPrefix + "/products");
});

app.use(urlPrefix + "/checkout", routerCheckout);
app.use(urlPrefix + "/order", routerOrder);
app.use(urlPrefix + "/products", routerProducts);


// Catch 404 and forward to error handler
app.use((_request, _response, next) => {
  next(createError(404));
});


// Error handler
app.use((error: Error, request: express.Request, response: express.Response) => {

  // Set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};

  // Render the error page
  response.status(error.status || 500);
  response.render("error");

});


export default app;
