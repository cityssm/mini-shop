"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const configFns = require("../helpers/configFns");
describe("configFns - properties with default values", () => {
    describe("application", () => {
        it("should return a number from application.httpPort", () => {
            assert.strictEqual(typeof (configFns.getProperty("application.httpPort")), "number");
        });
    });
    it("should return a function from orderNumberFunction", () => {
        assert.strictEqual(typeof (configFns.getProperty("orderNumberFunction")), "function");
    });
    describe("site.header", () => {
        it("should return a string from site.header.backgroundColorClass", () => {
            assert.strictEqual(typeof (configFns.getProperty("site.header.backgroundColorClass")), "string");
        });
    });
    describe("site.footer", () => {
        it("should return a boolean from site.footer.isVisible", () => {
            assert.strictEqual(typeof (configFns.getProperty("site.footer.isVisible")), "boolean");
        });
        it("should return a string from site.footer.backgroundColorClass", () => {
            assert.strictEqual(typeof (configFns.getProperty("site.footer.backgroundColorClass")), "string");
        });
        it("should return a string from site.footer.textColorClass", () => {
            assert.strictEqual(typeof (configFns.getProperty("site.footer.textColorClass")), "string");
        });
        it("should return a string from site.footer.footerEjs", () => {
            assert.strictEqual(typeof (configFns.getProperty("site.footer.footerEjs")), "string");
        });
    });
    describe("views.products", () => {
        it("should return a string from views.products.title", () => {
            assert.strictEqual(typeof (configFns.getProperty("views.products.title")), "string");
        });
    });
    describe("views.checkout", () => {
        it("should return a string from views.checkout.title", () => {
            assert.strictEqual(typeof (configFns.getProperty("views.checkout.title")), "string");
        });
    });
    describe("views.checkout_shipping", () => {
        it("should return a string from views.checkout_shipping.title", () => {
            assert.strictEqual(typeof (configFns.getProperty("views.checkout_shipping.title")), "string");
        });
    });
    describe("views.toPayment", () => {
        it("should return a string from views.toPayment.headerEjs", () => {
            assert.strictEqual(typeof (configFns.getProperty("views.toPayment.headerEjs")), "string");
        });
    });
    describe("views.order.title", () => {
        it("should return a string from views.order.title", () => {
            assert.strictEqual(typeof (configFns.getProperty("views.order.title")), "string");
        });
        it("should return a string from views.order.headerEjs", () => {
            assert.strictEqual(typeof (configFns.getProperty("views.order.headerEjs")), "string");
        });
    });
});
