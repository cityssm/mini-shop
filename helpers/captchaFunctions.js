import NodeCache from 'node-cache';
import { v4 as uuidv4 } from 'uuid';
const timeoutSecondsInitialLoad = 30;
const timeoutSecondsPostLookup = 15 * 60;
async function delay(millis) {
    await new Promise((resolve) => setTimeout(resolve, millis));
}
const captchaCache = new NodeCache({
    stdTTL: timeoutSecondsInitialLoad,
    useClones: false,
    maxKeys: 100_000
});
export async function generateNewCaptcha() {
    const captchaText = uuidv4().slice(0, 5).toUpperCase();
    let captchaKey = '';
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
}
export function getCaptchaText(captchaKey) {
    const captchaText = captchaCache.get(captchaKey);
    if (captchaText !== undefined) {
        captchaCache.set(captchaKey, captchaText, timeoutSecondsPostLookup);
    }
    return captchaText;
}
export function captchaIsMatch(captchaKey, captchaText) {
    if (!captchaCache.has(captchaKey)) {
        return false;
    }
    if (captchaText !== captchaCache.get(captchaKey)) {
        return false;
    }
    return true;
}
export function purgeCaptcha(captchaKey) {
    captchaCache.del(captchaKey);
}
