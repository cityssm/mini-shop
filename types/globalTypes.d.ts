import type { CartItem } from "./recordTypes";
export interface CartGlobal {
    add: (productFormElement: HTMLFormElement) => boolean;
    remove: (cartIndex: number) => void;
    clear: () => void;
    get: () => CartItem[];
    refresh: () => void;
}
