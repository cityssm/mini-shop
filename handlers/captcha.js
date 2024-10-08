import { CaptchaGenerator } from 'captcha-canvas';
import { getCaptchaText } from '../helpers/captchaFunctions.js';
export async function handler(request, response, next) {
    const captchaKey = request.params.captchaKey;
    const captchaText = getCaptchaText(captchaKey);
    if (!captchaText) {
        response.status(404);
        next();
        return;
    }
    const captcha = new CaptchaGenerator()
        .setDimension(150, 500)
        .setCaptcha({ text: captchaText, size: 60, color: '#ce1036' })
        .setDecoy({ opacity: 0.2 })
        .setTrace({ color: '#da1039', opacity: 0.3 });
    const buffer = await captcha.generate();
    response.contentType('image/png');
    response.set('Cache-Control', 'public, max-age=31557600');
    response.send(buffer);
}
