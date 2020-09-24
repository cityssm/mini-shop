import type { ShippingForm } from "../../types/recordTypes";
export declare const createOrder: (shippingForm: ShippingForm) => Promise<{
    orderNumber: string;
    orderSecret: string;
}>;
