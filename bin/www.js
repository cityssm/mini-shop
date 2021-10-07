import { onError, onListening } from "./serverFns.js";
import { app } from "../app.js";
import * as http from "http";
import * as https from "https";
import * as fs from "fs";
import * as configFunctions from "../helpers/configFns.js";
import Debug from "debug";
const debug = Debug("mini-shop:www");
const httpPort = configFunctions.getProperty("application.httpPort");
if (httpPort) {
    const httpServer = http.createServer(app);
    httpServer.listen(httpPort);
    httpServer.on("error", onError);
    httpServer.on("listening", () => {
        onListening(httpServer);
    });
    debug("HTTP listening on " + httpPort.toString());
}
const httpsConfig = configFunctions.getProperty("application.https");
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
    debug("HTTPS listening on " + httpsConfig.port.toString());
}
