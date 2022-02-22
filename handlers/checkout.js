import { generateNewCaptcha } from "../helpers/captchaFunctions.js";
export const handler = async (_request, response) => {
    const captchaKey = await generateNewCaptcha();
    return response.render("checkout", {
        pageTitle: "Checkout",
        captchaKey
    });
};
