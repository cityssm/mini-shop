#!/usr/bin/env node

import * as http from "http";

import * as log from "fancy-log";

import * as configFns from "../helpers/configFns";


function onError(error: Error) {

  if (error.syscall !== "listen") {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error("Requires elevated privileges");
      process.exit(1);
    // break;

    case "EADDRINUSE":
      console.error("Port is already in use.");
      process.exit(1);
    // break;

    default:
      throw error;
  }
}


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
