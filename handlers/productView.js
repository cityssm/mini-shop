import { recordAbuse } from '@cityssm/express-abuse-points';
import { getProperty } from '../helpers/configFunctions.js';
export default function handler(request, response) {
    const productSKU = request.params.productSKU;
    const product = getProperty('products')[productSKU];
    if (product === undefined) {
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
}
