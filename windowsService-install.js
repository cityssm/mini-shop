import { Service } from "node-windows";
import * as path from "path";
const svc = new Service({
    name: "Mini Shop",
    description: "A lightweight, highly customizable storefront.",
    script: path.join(__dirname, "bin", "www.js")
});
svc.on("install", () => {
    svc.start();
});
svc.install();
