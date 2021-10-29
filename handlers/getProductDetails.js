import * as configFunctions from "../helpers/configFunctions.js";
const getProductAndFeeDetails = (productSKUs) => {
    const products = {};
    const fees = {};
    for (const productSKU of productSKUs) {
        const product = configFunctions.getClientSideProduct(productSKU);
        if (!product) {
            continue;
        }
        let addProductToObject = true;
        product.feeTotals = {};
        for (const feeName of product.fees) {
            const fee = configFunctions.getProperty("fees")[feeName];
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
    return {
        products,
        fees
    };
};
export const handler = (request, response) => {
    const productSKUs = request.body.productSKUs.split(",");
    const returnObject = getProductAndFeeDetails(productSKUs);
    return response.json(returnObject);
};
export default handler;
