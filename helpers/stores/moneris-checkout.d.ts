import type { Order } from '@cityssm/mini-shop-db/types.js';
import type { Request } from 'express';
import type { LanguageCode } from 'iso-639-1';
import type { StoreValidatorReturn } from './types.js';
export declare function preloadRequest(order: Order, preferredLanguage: LanguageCode): Promise<false | string>;
export declare function validate(request: Request): Promise<StoreValidatorReturn>;
