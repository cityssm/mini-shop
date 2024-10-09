import { generateNewCaptcha } from '../helpers/captchaFunctions.js';
import * as configFunctions from '../helpers/configFunctions.js';
export default async function handler(_request, response) {
    const captchaKey = configFunctions.getProperty('settings.checkout_includeCaptcha')
        ? await generateNewCaptcha()
        : '';
    response.render('checkout', {
        pageTitle: 'Checkout',
        captchaKey
    });
}
