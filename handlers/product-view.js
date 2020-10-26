"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
exports.handler = (req, res) => {
    const productSKU = req.params.productSKU;
    return res.render("product-view", {
        productSKU
    });
};
