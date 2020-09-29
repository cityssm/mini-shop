import * as sql from "mssql";
import type { ShippingForm, CartItem } from "../../types/recordTypes";
declare type CreateOrderReturn = {
    success: true;
    orderNumber: string;
    orderSecret: string;
} | {
    success: false;
};
export declare const insertOrderItem: (pool: sql.ConnectionPool, orderID: number, cartIndex: number, cartItem: CartItem) => Promise<void>;
export declare const createOrder: (shippingForm: ShippingForm) => Promise<CreateOrderReturn>;
export {};
