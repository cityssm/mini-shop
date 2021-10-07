import { v4 as uuidv4 } from "uuid";
export const config = {
    application: {
        httpPort: 52525,
        applicationName: "Sample Clothing Store"
    },
    orderNumberFunction: () => {
        const today = new Date();
        return "RCT-" +
            today.getFullYear().toString() +
            ("0" + (today.getMonth() + 1).toString()).slice(-2) +
            ("0" + today.getDate().toString()).slice(-2) +
            "-" +
            uuidv4().toUpperCase();
    },
    mssqlConfig: {
        user: "",
        password: "",
        server: "",
        database: "",
        options: {
            enableArithAbort: true
        }
    },
    site: {
        header: {
            backgroundColorClass: "primary",
            logoImagePath: "/images/hat.png"
        }
    },
    views: {
        products: {
            title: "Sample Clothing Store"
        },
        checkout_shipping: {
            title: "Shipping Details",
            footerEjs: "checkout_noDatabase.ejs"
        }
    },
    productCategories: [
        {
            categoryName: "Clothing",
            productSKUs: ["tshirt", "jeans"]
        }
    ],
    products: {
        tshirt: {
            productName: "T-Shirt",
            image: {
                path: "images/shirtRack.jpg",
                dimensionClass: "3by2"
            },
            productEjs: "clothes_tshirt.ejs",
            price: 15,
            fees: ["hst"],
            formFieldsToSave: [{
                    fieldName: "Colour",
                    formFieldName: "colour"
                }, {
                    fieldName: "Size",
                    formFieldName: "size"
                }]
        },
        jeans: {
            productName: "Blue Jeans",
            image: {
                path: "images/jeans.jpg",
                dimensionClass: "3by2"
            },
            productEjs: "clothes_jeans.ejs",
            price: 35,
            fees: ["hst"],
            formFieldsToSave: [{
                    fieldName: "Style",
                    formFieldName: "style"
                }, {
                    fieldName: "Size",
                    formFieldName: "size"
                }]
        }
    },
    fees: {
        hst: {
            feeName: "HST",
            feeCalculation: (product) => {
                if (typeof (product.price) === "string") {
                    return 0;
                }
                else {
                    return product.price * 0.13;
                }
            }
        }
    },
    store: {
        storeType: "testing-free"
    }
};
export default config;
