import type { Order } from "../../types/recordTypes";
export declare const getOrder: (orderNumber: string, orderSecret: string, orderIsPaid: boolean) => Promise<false | Order>;
