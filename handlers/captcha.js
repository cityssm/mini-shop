import { getCaptchaText } from "../helpers/captchaFunctions.js";
import { CaptchaGenerator } from "captcha-canvas";
export const handler = async (request, response, next) => {
    const captchaKey = request.params.captchaKey;
    const captchaText = getCaptchaText(captchaKey);
    if (!captchaText) {
        response.status(404);
        return next();
    }
    const captcha = new CaptchaGenerator()
        .setDimension(150, 500)
        .setCaptcha({ text: captchaText, size: 60, color: "#ce1036" })
        .setDecoy({ opacity: 0.4 })
        .setTrace({ color: "#da1039" });
    const buffer = await captcha.generate();
    response.contentType("image/png");
    response.set('Cache-Control', 'public, max-age=31557600');
    return response.send(buffer);
};
