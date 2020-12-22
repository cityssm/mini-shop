"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            appURL + "/lib/fontawesome-free/webfonts/fa-solid-900.woff2",
            appURL + "/lib/formToObject/formToObject.min.js",
            appURL + "/lib/typeface-barlow/barlow-all-600.woff2",
            appURL + "/products",
            appURL + "/checkout"
        ];
        for (const url of urls) {
            it("should load - " + url, (done) => {
                (() => __awaiter(void 0, void 0, void 0, function* () {
                    let browser;
                    try {
                        browser = yield puppeteer.launch();
                        const page = yield browser.newPage();
                        yield page.goto(url)
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
                        yield browser.close();
                    }
                }))()
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
            (() => __awaiter(void 0, void 0, void 0, function* () {
                let browser;
                try {
                    browser = yield puppeteer.launch();
                    const page = yield browser.newPage();
                    yield page.goto(appURL + "/page-not-found")
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
                    yield browser.close();
                }
            }))()
                .catch(() => {
                assert.fail();
            })
                .finally(() => {
                done();
            });
        });
    });
});
