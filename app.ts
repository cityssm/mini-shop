import * as createError from "http-errors";
import * as express from "express";

import * as compression from "compression";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";

import * as configFns from "./helpers/configFns";
import * as stringFns from "@cityssm/expressjs-server-js/stringFns";

import * as routerCart from "./routes/cart";
import * as routerCheckout from "./routes/checkout";
import * as routerProducts from "./routes/products";

import * as session from "express-session";
import * as sqlite from "connect-sqlite3";
const SQLiteStore = sqlite(session);


/*
 * INITIALIZE APP
 */


const app = express();


// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(compression());
app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());


/*
 * STATIC ROUTES
 */


app.use(express.static(path.join(__dirname, "public")));

app.use("/typeface-barlow",
  express.static(path.join(__dirname, "node_modules", "@openfonts", "barlow_all", "files")));

app.use("/fontawesome-free",
  express.static(path.join(__dirname, "node_modules", "@fortawesome", "fontawesome-free")));


/*
 * SESSION MANAGEMENT
 */


const sessionCookieName = configFns.getProperty("session.cookieName");


// Initialize session
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

// Clear cookie if no corresponding session
app.use(function(req, res, next) {

  if (req.cookies[sessionCookieName] && !req.session.user) {

    res.clearCookie(sessionCookieName);

  }

  next();

});


/*
 * ROUTES
 */


// Make config objects available to the templates
app.use(function(_req, res, next) {
  res.locals.configFns = configFns;
  res.locals.stringFns = stringFns;
  next();
});


app.all("/", function(_req, res) {
  res.redirect("/products");
});

app.use("/cart", routerCart);
app.use("/checkout", routerCheckout);
app.use("/products", routerProducts);


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
