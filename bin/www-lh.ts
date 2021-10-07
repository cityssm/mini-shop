import { onError } from "./serverFns";

import { app } from "../app.js";

import * as http from "http";

import * as configFunctions from "../helpers/configFns";

import Debug from "debug";
const debug = Debug("mini-shop:www");


/*
 * Override any url prefix value
 */


configFunctions.overrideProperty("reverseProxy.urlPrefix", "");
debug(configFunctions.getProperty("reverseProxy.urlPrefix"));


/**
* Initialize HTTP
*/


const httpPort = 50_000;

const httpServer = http.createServer(app);

httpServer.listen(httpPort);

httpServer.on("error", onError);


debug("HTTP listening on " + httpPort.toString());
