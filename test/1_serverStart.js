import * as assert from "assert";
import * as puppeteer from "puppeteer";
import * as http from "http";
import app from "../app";
import { shutdown as abuseCheckShutdown } from "@cityssm/express-abuse-points";
import * as configFns from "../helpers/configFns";
describe("mini-shop", () => {
    const httpServer = http.createServer(app);
    const portNumber = 52525;
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
        catch (_e) {
            console.log(_e);
        }
    });
    it("should start server starts on port " + portNumber.toString(), () => {
        assert.ok(serverStarted);
    });
    const appURL = "http://localhost:" + portNumber.toString() + configFns.getProperty("reverseProxy.urlPrefix");
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
                            .then((res) => {
                            assert.strictEqual(res.status(), 200);
                        })
                            .catch(() => {
                            assert.fail();
                        });
                    }
                    catch (_e) {
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
                        .then((res) => {
                        assert.strictEqual(res.status(), 404);
                    })
                        .catch(() => {
                        assert.fail();
                    });
                }
                catch (_e) {
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
