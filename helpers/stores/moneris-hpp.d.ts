import type { Request } from "express";
import type { StoreValidatorReturn } from "./types";
export declare const validate: (request: Request) => Promise<StoreValidatorReturn>;
