#!/usr/bin/env node

import { onError } from "./serverFns";

import * as http from "http";

import * as log from "fancy-log";

import * as configFns from "../helpers/configFns";


/*
 * Override any url prefix value
 */


configFns.overrideProperty("reverseProxy.urlPrefix", "");
log(configFns.getProperty("reverseProxy.urlPrefix"));


/**
* Initialize HTTP
*/


import app = require("../app");

const httpPort = 50000;

const httpServer = http.createServer(app);

httpServer.listen(httpPort);

httpServer.on("error", onError);


log.info("HTTP listening on " + httpPort.toString());
