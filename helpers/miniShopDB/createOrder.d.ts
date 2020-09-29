import type { ShippingForm } from "../../types/recordTypes";
declare type CreateOrderReturn = {
    success: true;
    orderNumber: string;
    orderSecret: string;
} | {
    success: false;
};
export declare const createOrder: (shippingForm: ShippingForm) => Promise<CreateOrderReturn>;
export {};
