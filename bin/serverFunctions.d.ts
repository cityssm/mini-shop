import type http from 'node:http';
import type https from 'node:https';
export declare const onError: (error: Error) => void;
export declare const onListening: (server: http.Server | https.Server) => void;
