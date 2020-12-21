"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const configFns = require("../helpers/configFns");
const handler = (req, res) => {
    const productSKUs = req.body.productSKUs.split(",");
    const products = {};
    const fees = {};
    for (const productSKU of productSKUs) {
        const product = configFns.getClientSideProduct(productSKU);
        if (!product) {
            continue;
        }
        let addProductToObject = true;
        product.feeTotals = {};
        for (const feeName of product.fees) {
            const fee = configFns.getProperty("fees")[feeName];
            if (fee) {
                product.feeTotals[feeName] = fee.feeCalculation(product);
                fees[feeName] = fee;
            }
            else {
                addProductToObject = false;
                break;
            }
        }
        if (addProductToObject) {
            products[productSKU] = product;
        }
    }
    return res.json({
        products,
        fees
    });
};
exports.handler = handler;
