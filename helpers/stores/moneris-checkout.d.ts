import type { Request } from "express";
import type { Order } from "@cityssm/mini-shop-db/types";
import type { StoreValidatorReturn } from "./types";
export declare const preloadRequest: (order: Order) => Promise<false | string>;
export declare const validate: (request: Request) => Promise<StoreValidatorReturn>;
