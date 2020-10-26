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
            httpServer.close();
        }
        catch (_e) {
        }
    });
    it("should start server starts on port " + portNumber.toString(), () => {
        assert.ok(serverStarted);
    });
    const appURL = "http://localhost:" + portNumber.toString();
    describe("simple page tests", () => {
        const productsURL = appURL + "/products";
        const checkoutURL = appURL + "/checkout";
        it("should load products page - " + productsURL, (done) => {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const browser = yield puppeteer.launch();
                const page = yield browser.newPage();
                yield page.goto(productsURL);
                yield browser.close();
            }))()
                .finally(() => {
                done();
            });
        });
        it("should load checkout page - " + checkoutURL, (done) => {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const browser = yield puppeteer.launch();
                const page = yield browser.newPage();
                yield page.goto(checkoutURL);
                yield browser.close();
            }))()
                .finally(() => {
                done();
            });
        });
    });
    describe("error page tests", () => {
        it("should return a 404 not found error", (done) => {
            let browser;
            (() => __awaiter(void 0, void 0, void 0, function* () {
                browser = yield puppeteer.launch();
                const page = yield browser.newPage();
                let status = 0;
                yield page.goto(appURL + "/page-not-found")
                    .then((res) => {
                    status = res.status();
                })
                    .catch(() => {
                    assert.fail();
                })
                    .finally(() => {
                    assert.strictEqual(status, 404);
                    done();
                });
            }))()
                .catch(() => {
                assert.fail();
            })
                .finally(() => {
                void browser.close();
            });
        });
    });
});
