import { Service } from "node-windows";
import path from "path";

const __dirname = ".";

// Create a new service object
const svc = new Service({
  name: "Mini Shop",
  script: path.join(__dirname, "bin", "www.js")
});

// Listen for the "uninstall" event so we know when it's done.
svc.on("uninstall", function() {
  console.log("Uninstall complete.");
  console.log("The service exists:", svc.exists);
});

// Uninstall the service.
svc.uninstall();
