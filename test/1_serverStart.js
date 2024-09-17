import * as assert from "assert";
import * as puppeteer from "puppeteer";
import * as http from "http";
import { app } from "../app.js";
import { shutdown as abuseCheckShutdown } from "@cityssm/express-abuse-points";
import * as configFunctions from "../helpers/configFunctions.js";
describe("mini-shop", () => {
    const httpServer = http.createServer(app);
    const portNumber = 52_525;
    let serverStarted = false;
    before(() => {
        httpServer.listen(portNumber);
        httpServer.on("listening", () => {
            serverStarted = true;
        });
    });
    after(() => {
        try {
            abuseCheckShutdown();
            httpServer.close();
        }
        catch (error) {
            console.log(error);
        }
    });
    it("should start server starts on port " + portNumber.toString(), () => {
        assert.ok(serverStarted);
    });
    const appURL = "http://localhost:" + portNumber.toString() + configFunctions.getProperty("reverseProxy.urlPrefix");
    describe("simple page tests", () => {
        const urls = [
            appURL + "/stylesheets/style.min.css",
            appURL + "/javascripts/cart.min.js",
            appURL + "/javascripts/checkout.min.js",
            appURL + "/javascripts/product-view.min.js",
            appURL + "/lib/bulma-webapp-js/cityssm.min.js",
            appURL + "/lib/formToObject/formToObject.min.js",
            appURL + "/products",
            appURL + "/checkout"
        ];
        for (const url of urls) {
            it("should load - " + url, (done) => {
                (async () => {
                    let browser;
                    try {
                        browser = await puppeteer.launch();
                        const page = await browser.newPage();
                        await page.goto(url)
                            .then((response) => {
                            assert.strictEqual(response.status(), 200);
                        })
                            .catch(() => {
                            assert.fail();
                        });
                    }
                    catch (error) {
                    }
                    finally {
                        await browser.close();
                    }
                })()
                    .catch(() => {
                    assert.fail();
                })
                    .finally(() => {
                    done();
                });
            });
        }
    });
    describe("error page tests", () => {
        it("should return a 404 not found error", (done) => {
            (async () => {
                let browser;
                try {
                    browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto(appURL + "/page-not-found")
                        .then((response) => {
                        assert.strictEqual(response.status(), 404);
                    })
                        .catch(() => {
                        assert.fail();
                    });
                }
                catch {
                }
                finally {
                    await browser.close();
                }
            })()
                .catch(() => {
                assert.fail();
            })
                .finally(() => {
                done();
            });
        });
    });
});
