"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const configFns = require("../helpers/configFns");
exports.handler = (req, res) => {
    const productSKU = req.params.productSKU;
    if (!configFns.getProperty("products")[productSKU]) {
        res.status(404);
        return res.render("product-notFound");
    }
    return res.render("product-view", {
        productSKU
    });
};
