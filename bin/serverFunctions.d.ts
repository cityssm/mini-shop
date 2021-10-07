import type * as http from "http";
import type * as https from "https";
export declare const onError: (error: Error) => void;
export declare const onListening: (server: http.Server | https.Server) => void;
