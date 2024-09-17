import { v4 as uuidv4 } from "uuid";
import NodeCache from "node-cache";
const timeoutSeconds_initialLoad = 30;
const timeoutSeconds_postLookup = 15 * 60;
const delay = (millis) => {
    return new Promise(resolve => setTimeout(resolve, millis));
};
const captchaCache = new NodeCache({
    stdTTL: timeoutSeconds_initialLoad,
    useClones: false,
    maxKeys: 100_000
});
export const generateNewCaptcha = async () => {
    const captchaText = uuidv4().slice(0, 5).toUpperCase();
    let captchaKey = "";
    do {
        captchaKey = uuidv4();
    } while (captchaCache.has(captchaKey));
    try {
        captchaCache.set(captchaKey, captchaText);
    }
    catch {
        await delay(10_000);
        return await generateNewCaptcha();
    }
    return captchaKey;
};
export const getCaptchaText = (captchaKey) => {
    const captchaText = captchaCache.get(captchaKey);
    if (captchaText) {
        captchaCache.set(captchaKey, captchaText, timeoutSeconds_postLookup);
    }
    return captchaText;
};
export const captchaIsMatch = (captchaKey, captchaText) => {
    if (!captchaCache.has(captchaKey)) {
        return false;
    }
    if (captchaText !== captchaCache.get(captchaKey)) {
        return false;
    }
    return true;
};
export const purgeCaptcha = (captchaKey) => {
    captchaCache.del(captchaKey);
};
