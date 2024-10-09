import { generateNewCaptcha } from '../helpers/captchaFunctions.js';
import { getProperty } from '../helpers/configFunctions.js';
export default async function handler(_request, response) {
    const captchaKey = getProperty('settings.checkout_includeCaptcha')
        ? await generateNewCaptcha()
        : '';
    response.render('checkout', {
        pageTitle: 'Checkout',
        captchaKey
    });
}
