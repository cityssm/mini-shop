"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const configFns = require("../helpers/configFns");
const handler = (req, res) => {
    const productSKU = req.params.productSKU;
    const product = configFns.getProperty("products")[productSKU];
    if (!product) {
        res.status(404);
        return res.render("product-notFound");
    }
    return res.render("product-view", {
        pageTitle: product.productName,
        productSKU,
        product
    });
};
exports.handler = handler;
