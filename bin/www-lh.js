#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverFns_1 = require("./serverFns");
const http = require("http");
const log = require("fancy-log");
const configFns = require("../helpers/configFns");
configFns.overrideProperty("reverseProxy.urlPrefix", "");
log(configFns.getProperty("reverseProxy.urlPrefix"));
const app = require("../app");
const httpPort = 50000;
const httpServer = http.createServer(app);
httpServer.listen(httpPort);
httpServer.on("error", serverFns_1.onError);
log.info("HTTP listening on " + httpPort.toString());
