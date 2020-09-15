export interface Config {

  application?: {
    httpPort?: number;
    https?: Config_HTTPSConfig;
    applicationName?: string;
  };

  session?: {
    cookieName?: string;
    secret?: string;
    maxAgeMillis?: number;
  };

  moneris?: {
    storeURL: string;
    ps_store_id: string;
    hpp_key: string;
  };

  products?: {
    [productSKU: string]: Config_Product;
  };

  fees?: {
    [feeName: string]: Config_Fee;
  };
}

export interface Config_HTTPSConfig {
  port: number;
  keyPath: string;
  certPath: string;
  passphrase?: string;
}

export interface Config_Product {
  productName: string;
  description?: string;
  image?: Config_ProductImage;
  price: number;
  fees?: string[];
  ejsViewPath: string;
}

export interface Config_ProductImage {
  path: string;
  dimensionClass: "square" | "1by1" | "5by4" | "4by3" | "3by2" | "5by3" | "16by9" | "2by1" | "3by1";
}

export interface Config_Fee {
  feeName: string;
  feeCalculation: (product: Config_Product) => number;
};
