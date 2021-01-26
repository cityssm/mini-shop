#!/usr/bin/env node

import { onError, onListening } from "./serverFns";

import * as app from "../app";

import * as http from "http";
import * as https from "https";
import * as fs from "fs";

import * as log from "fancy-log";

import * as configFns from "../helpers/configFns";

/**
 * Initialize HTTP
 */

const httpPort = configFns.getProperty("application.httpPort");

if (httpPort) {

  const httpServer = http.createServer(app);

  httpServer.listen(httpPort);

  httpServer.on("error", onError);
  httpServer.on("listening", () => {
    onListening(httpServer);
  });

  log.info("HTTP listening on " + httpPort.toString());
}

/**
 * Initialize HTTPS
 */

const httpsConfig = configFns.getProperty("application.https");

if (httpsConfig) {

  const httpsServer = https.createServer({
    key: fs.readFileSync(httpsConfig.keyPath),
    cert: fs.readFileSync(httpsConfig.certPath),
    passphrase: httpsConfig.passphrase
  }, app);

  httpsServer.listen(httpsConfig.port);

  httpsServer.on("error", onError);

  httpsServer.on("listening", () => {
    onListening(httpsServer);
  });

  log.info("HTTPS listening on " + httpsConfig.port.toString());

}
