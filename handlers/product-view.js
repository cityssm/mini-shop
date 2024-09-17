import { recordAbuse } from '@cityssm/express-abuse-points';
import * as configFunctions from '../helpers/configFunctions.js';
export const handler = (request, response) => {
    const productSKU = request.params.productSKU;
    const product = configFunctions.getProperty('products')[productSKU];
    if (!product) {
        recordAbuse(request);
        response.status(404);
        response.render('product-notFound');
        return;
    }
    response.render('product-view', {
        pageTitle: product.productName,
        productSKU,
        product
    });
};
