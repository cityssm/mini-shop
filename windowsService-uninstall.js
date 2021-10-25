import { Service } from "node-windows";
import path from "path";
const __dirname = ".";
const svc = new Service({
    name: "Mini Shop",
    script: path.join(__dirname, "bin", "www.js")
});
svc.on("uninstall", function () {
    console.log("Uninstall complete.");
    console.log("The service exists:", svc.exists);
});
svc.uninstall();
