"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onListening = exports.onError = void 0;
const log = require("fancy-log");
const onError = (error) => {
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
};
exports.onError = onError;
const onListening = (server) => {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port.toString();
    log.info("Listening on " + bind);
};
exports.onListening = onListening;
