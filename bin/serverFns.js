import Debug from "debug";
const debug = Debug("mini-shop:sreverFns");
export const onError = (error) => {
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
export const onListening = (server) => {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port.toString();
    debug("Listening on " + bind);
};
