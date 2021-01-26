#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverFns_1 = require("./serverFns");
const app = require("../app");
const http = require("http");
const https = require("https");
const fs = require("fs");
const log = require("fancy-log");
const configFns = require("../helpers/configFns");
const httpPort = configFns.getProperty("application.httpPort");
if (httpPort) {
    const httpServer = http.createServer(app);
    httpServer.listen(httpPort);
    httpServer.on("error", serverFns_1.onError);
    httpServer.on("listening", () => {
        serverFns_1.onListening(httpServer);
    });
    log.info("HTTP listening on " + httpPort.toString());
}
const httpsConfig = configFns.getProperty("application.https");
if (httpsConfig) {
    const httpsServer = https.createServer({
        key: fs.readFileSync(httpsConfig.keyPath),
        cert: fs.readFileSync(httpsConfig.certPath),
        passphrase: httpsConfig.passphrase
    }, app);
    httpsServer.listen(httpsConfig.port);
    httpsServer.on("error", serverFns_1.onError);
    httpsServer.on("listening", () => {
        serverFns_1.onListening(httpsServer);
    });
    log.info("HTTPS listening on " + httpsConfig.port.toString());
}
