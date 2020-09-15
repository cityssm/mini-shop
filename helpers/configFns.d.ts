import * as configTypes from "../types/configTypes";
export declare function getProperty(propertyName: "application.httpPort"): number;
export declare function getProperty(propertyName: "application.https"): configTypes.Config_HTTPSConfig;
export declare function getProperty(propertyName: "session.cookieName"): string;
export declare function getProperty(propertyName: "session.secret"): string;
export declare function getProperty(propertyName: "session.maxAgeMillis"): number;
