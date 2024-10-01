import type { Product as MiniShopDatabaseProduct } from '@cityssm/mini-shop-db/types.js';
import type { LanguageCode } from 'iso-639-1';
import type { ConfigProduct, StringWithTranslations } from '../types/configTypes.js';
export declare function removeTranslationFromProduct(configProduct: ConfigProduct, language: LanguageCode): MiniShopDatabaseProduct;
export declare function getStringByLanguage(languageStringProperty: string | StringWithTranslations | undefined, preferredLanguage: LanguageCode): string | undefined;
