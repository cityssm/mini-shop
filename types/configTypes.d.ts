import type * as sqlTypes from "mssql";
declare type BulmaColors = "white" | "black" | "light" | "dark" | "primary" | "link" | "info" | "success" | "warning" | "danger";
export declare type ProductHandlers = "ssm-ticket_parking/doIsTagNumberEligible";
export interface Config {
    application?: {
        httpPort?: number;
        https?: Config_HTTPSConfig;
        applicationName?: string;
    };
    reverseProxy?: {
        disableCompression: boolean;
        disableEtag: boolean;
        blockViaXForwardedFor: boolean;
        urlPrefix: string;
    };
    mssqlConfig?: sqlTypes.config;
    orderNumberFunction?: () => string;
    site?: {
        header?: {
            backgroundColorClass?: BulmaColors;
            logoImagePath?: string;
        };
        footer?: {
            isVisible?: boolean;
            backgroundColorClass?: BulmaColors;
            textColorClass?: BulmaColors;
            footerEjs?: string;
        };
    };
    views?: {
        products?: Config_ViewDefinition;
        checkout?: Config_ViewDefinition;
        checkout_shipping?: Config_ViewDefinition;
        toPayment?: Config_ViewDefinition;
        order?: Config_ViewDefinition;
    };
    productCategories?: Array<{
        categoryName: string;
        categoryEjs?: string;
        productSKUs: string[];
    }>;
    products?: {
        [productSKU: string]: Config_Product;
    };
    productHandlers?: ProductHandlers[];
    fees?: {
        [feeSKU: string]: Config_FeeDefinition;
    };
    currency?: {
        code: string;
        currencyName: string;
    };
    store?: StoreConfigs;
}
interface StoreConfig {
    storeType: StoreTypes;
    storeConfig?: Record<string, unknown>;
}
export declare type StoreTypes = "moneris-hpp" | "moneris-checkout" | "testing-free";
export declare type StoreConfigs = StoreConfig_MonerisHPP | StoreConfig_MonerisCheckout | StoreConfig_TestingFree;
interface StoreConfig_MonerisHPP extends StoreConfig {
    storeType: "moneris-hpp";
    storeConfig: {
        storeURL: "https://esqa.moneris.com/HPPDP/index.php" | "https://www3.moneris.com/HPPDP/index.php";
        ps_store_id: string;
        hpp_key: string;
        fees?: {
            gst?: string;
            pst?: string;
            hst?: string;
            shipping?: string;
        };
    };
}
export interface StoreConfig_MonerisCheckout extends StoreConfig {
    storeType: "moneris-checkout";
    storeConfig: {
        store_id: string;
        api_token: string;
        checkout_id: string;
        environment: "qa" | "prod";
    };
}
interface StoreConfig_TestingFree extends StoreConfig {
    storeType: "testing-free";
}
export interface Config_HTTPSConfig {
    port: number;
    keyPath: string;
    certPath: string;
    passphrase?: string;
}
export interface Config_ViewDefinition {
    title?: string;
    headerEjs?: string;
    footerEjs?: string;
}
export interface Config_Product {
    productName: string;
    description?: string;
    image?: {
        path: string;
        dimensionClass: "square" | "1by1" | "5by4" | "4by3" | "3by2" | "5by3" | "16by9" | "2by1" | "3by1";
    };
    price: number | "form";
    formFieldsToSave?: Array<{
        fieldName: string;
        formFieldName: string;
    }>;
    identifierFormFieldName?: string;
    fees?: string[];
    productEjs?: string;
    feeTotals?: {
        [feeSKU: string]: number;
    };
}
export interface Config_FeeDefinition {
    feeName: string;
    feeCalculation: (product: Config_Product) => number;
}
export {};
