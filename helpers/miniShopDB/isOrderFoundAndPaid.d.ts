export declare const isOrderFoundAndPaid: (orderNumber: string, orderSecret: string) => Promise<{
    found: boolean;
    paid: boolean;
    orderID?: number;
}>;
