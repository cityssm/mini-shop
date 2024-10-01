import type { Fee as MiniShopDatabaseFee, Product as MiniShopDatabaseProduct } from '@cityssm/mini-shop-db/types.js';
import type { ConfigFeeDefinition, ConfigProduct } from '../types/configTypes.js';
export declare function fixProducts(configProducts: Record<string, ConfigProduct>): Record<string, MiniShopDatabaseProduct>;
export declare function fixFees(configFees: Record<string, ConfigFeeDefinition>): Record<string, MiniShopDatabaseFee>;
