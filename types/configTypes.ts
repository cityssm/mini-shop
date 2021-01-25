import type * as sqlTypes from "mssql";

type BulmaColors =
  "white" | "black" | "light" | "dark" | "primary" | "link" | "info" | "success" | "warning" | "danger";

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
    products?: Config_View;
    checkout?: Config_View;
    checkout_shipping?: Config_View;
    toPayment?: Config_View;
    order?: Config_View;
  };

  productCategories?: Array<{
    categoryName: string;
    categoryEjs?: string;
    productSKUs: string[];
  }>;

  products?: {
    // productSKU maxlength = 20
    [productSKU: string]: Config_Product;
  };

  fees?: {
    // feeName maxlength = 20
    [feeName: string]: Config_Fee;
  };

  currency?: {
    code: string;
    currencyName: string;
  };

  store?: {
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
  } | {
    storeType: "testing-free";
  };
}

export interface Config_HTTPSConfig {
  port: number;
  keyPath: string;
  certPath: string;
  passphrase?: string;
}

export interface Config_View {
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
    // formFieldName maxlength = 30
    formFieldName: string;
  }>;
  fees?: string[];
  feeTotals?: {
    // feeName maxlength = 20
    [feeName: string]: number;
  };
  productEjs?: string;
}

export interface Config_Fee {
  feeName: string;
  feeCalculation: (product: Config_Product) => number;
}
