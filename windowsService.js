import path from "path";
const __dirname = ".";
export const serviceConfig = {
    name: "Mini Shop",
    description: "A lightweight, highly customizable storefront.",
    script: path.join(__dirname, "bin", "www.js")
};
export default serviceConfig;
