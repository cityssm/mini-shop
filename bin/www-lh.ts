import { onError } from "./serverFunctions.js";

import * as http from "http";

import * as configFunctions from "../helpers/configFunctions.js";

import Debug from "debug";
const debug = Debug("mini-shop:www-lh");


/*
 * Override any url prefix value
 */


configFunctions.overrideProperty("reverseProxy.urlPrefix", "");
debug(configFunctions.getProperty("reverseProxy.urlPrefix"));

const app = (await import("../app.js")).app;


/**
* Initialize HTTP
*/


const httpPort = 50_000;

const httpServer = http.createServer(app);

httpServer.listen(httpPort);

httpServer.on("error", onError);


debug("HTTP listening on " + httpPort.toString());
