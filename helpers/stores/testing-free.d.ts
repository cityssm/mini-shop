import type { Request } from 'express';
import type { StoreValidatorReturn } from './types.js';
export declare function validate(request: Request<unknown, unknown, {
    orderNumber?: string;
    orderSecret?: string;
}>): StoreValidatorReturn;
