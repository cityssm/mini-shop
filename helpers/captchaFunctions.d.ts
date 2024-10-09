export declare function generateNewCaptcha(): Promise<string>;
export declare function getCaptchaText(captchaKey: string): string;
export declare function captchaIsMatch(captchaKey: string, captchaText: string): boolean;
export declare function purgeCaptcha(captchaKey: string): void;
