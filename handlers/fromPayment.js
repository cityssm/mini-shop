import { recordAbuse } from '@cityssm/express-abuse-points';
import { updateOrderAsPaid } from '@cityssm/mini-shop-db';
import { getProperty } from '../helpers/configFunctions.js';
import { validate as monerisCheckout_validate } from '../helpers/stores/moneris-checkout.js';
import { validate as testingFree_validate } from '../helpers/stores/testing-free.js';
export default async function handler(request, response) {
    const storeType = getProperty('store.storeType');
    let storeValidatorReturn = {
        isValid: false,
        errorCode: 'noHandler'
    };
    switch (storeType) {
        case 'moneris-checkout': {
            storeValidatorReturn = await monerisCheckout_validate(request);
            break;
        }
        case 'testing-free': {
            storeValidatorReturn = testingFree_validate(request);
            break;
        }
        default: {
            break;
        }
    }
    let orderRecordMarkedAsPaid = false;
    if (storeValidatorReturn.isValid) {
        orderRecordMarkedAsPaid = await updateOrderAsPaid(storeValidatorReturn);
    }
    const urlPrefix = getProperty('reverseProxy.urlPrefix');
    if (storeValidatorReturn.isValid && orderRecordMarkedAsPaid) {
        response.redirect(`${urlPrefix}/order/${storeValidatorReturn.orderNumber}/${storeValidatorReturn.orderSecret}`);
    }
    else {
        recordAbuse(request);
        response.redirect(`${urlPrefix}/order/error`);
    }
}
