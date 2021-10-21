import type { CartItem } from "@cityssm/mini-shop-db/types";

export interface CartGlobal {
  add: (productFormElement: HTMLFormElement) => boolean;
  remove: (cartIndex: number) => void;
  clear: () => void;
  get: () => CartItem[];
  refresh: () => void;
}
