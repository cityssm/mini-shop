/* eslint-disable no-process-exit, unicorn/no-process-exit */

import type * as http from "http";
import type * as https from "https";

import Debug from "debug";
const debug = Debug("mini-shop:sreverFns");


export const onError = (error: Error): void => {

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
};

export const onListening = (server: http.Server | https.Server): void => {

  const addr = server.address();

  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port.toString();

  debug("Listening on " + bind);
};
