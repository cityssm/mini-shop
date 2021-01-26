import type * as http from "http";
import type * as https from "https";
export declare const onError: (error: Error) => never;
export declare const onListening: (server: http.Server | https.Server) => void;
