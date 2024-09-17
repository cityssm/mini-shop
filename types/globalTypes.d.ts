import type { ShippingForm } from '@cityssm/mini-shop-db/types';
export interface CartGlobal {
    add: (productFormElement: HTMLFormElement) => boolean;
    remove: (cartIndex: number) => void;
    clear: () => void;
    get: () => ShippingForm;
    refresh: () => void;
    cacheContact: () => void;
}
