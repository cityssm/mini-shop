#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const log = require("fancy-log");
const configFns = require("../helpers/configFns");
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    switch (error.code) {
        case "EACCES":
            console.error("Requires elevated privileges");
            process.exit(1);
        case "EADDRINUSE":
            console.error("Port is already in use.");
            process.exit(1);
        default:
            throw error;
    }
}
configFns.overrideProperty("reverseProxy.urlPrefix", "");
log(configFns.getProperty("reverseProxy.urlPrefix"));
const app = require("../app");
const httpPort = 50000;
const httpServer = http.createServer(app);
httpServer.listen(httpPort);
httpServer.on("error", onError);
log.info("HTTP listening on " + httpPort.toString());
