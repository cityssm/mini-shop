"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const puppeteer = require("puppeteer");
const http = require("http");
const app = require("../app");
const express_abuse_points_1 = require("@cityssm/express-abuse-points");
const configFns = require("../helpers/configFns");
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
            express_abuse_points_1.shutdown();
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
