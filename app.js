"use strict";
const createError = require("http-errors");
const express = require("express");
const compression = require("compression");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const configFns = require("./helpers/configFns");
const stringFns = require("@cityssm/expressjs-server-js/stringFns");
const routerCheckout = require("./routes/checkout");
const routerProducts = require("./routes/products");
const session = require("express-session");
const sqlite = require("connect-sqlite3");
const SQLiteStore = sqlite(session);
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
const sessionCookieName = configFns.getProperty("session.cookieName");
app.use(session({
    store: new SQLiteStore({
        dir: "data",
        db: "sessions.db"
    }),
    name: sessionCookieName,
    secret: configFns.getProperty("session.secret"),
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: configFns.getProperty("session.maxAgeMillis"),
        sameSite: "strict"
    }
}));
app.use(function (req, res, next) {
    if (req.cookies[sessionCookieName] && !req.session.user) {
        res.clearCookie(sessionCookieName);
    }
    next();
});
app.use(function (_req, res, next) {
    res.locals.configFns = configFns;
    res.locals.stringFns = stringFns;
    next();
});
app.all("/", function (_req, res) {
    res.redirect("/products");
});
app.use("/checkout", routerCheckout);
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
