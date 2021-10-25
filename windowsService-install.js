import { Service } from "node-windows";
import path from "path";
const __dirname = ".";
const svc = new Service({
    name: "Mini Shop",
    description: "A lightweight, highly customizable storefront.",
    script: path.join(__dirname, "bin", "www.js")
});
svc.on("install", () => {
    svc.start();
});
svc.install();
