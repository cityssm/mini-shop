export declare const generateNewCaptcha: () => Promise<string>;
export declare const getCaptchaText: (captchaKey: string) => string;
export declare const captchaIsMatch: (captchaKey: string, captchaText: string) => boolean;
export declare const purgeCaptcha: (captchaKey: string) => void;
