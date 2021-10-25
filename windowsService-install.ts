import { Service } from "node-windows";
import path from "path";

const __dirname = ".";

// Create a new service object
const svc = new Service({
  name: "Mini Shop",
  description: "A lightweight, highly customizable storefront.",
  script: path.join(__dirname, "bin", "www.js")
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", () => {
  svc.start();
});

svc.install();
