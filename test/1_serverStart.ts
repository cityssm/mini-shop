import * as assert from "assert";

import * as puppeteer from "puppeteer";

import * as http from "http";
import * as app from "../app";

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

    } catch (_e) {
      console.log(_e);
      // ignore
    }
  });

  it("should start server starts on port " + portNumber.toString(), () => {
    assert.ok(serverStarted);
  });

  const appURL = "http://localhost:" + portNumber.toString() + configFns.getProperty("reverseProxy.urlPrefix");

  describe("simple page tests", () => {

    const productsURL = appURL + "/products";
    const checkoutURL = appURL + "/checkout";

    it("should load products page - " + productsURL, (done) => {
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(productsURL)
          .then((res) => {
            assert.strictEqual(res.status(), 200);
          })
          .catch(() => {
            assert.fail();
          });

        await browser.close();
      })()
        .catch(() => {
          assert.fail();
        })
        .finally(() => {
          done();
        });
    });

    it("should load checkout page - " + checkoutURL, (done) => {
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(checkoutURL)
          .then((res) => {
            assert.strictEqual(res.status(), 200);
          })
          .catch(() => {
            assert.fail();
          });

        await browser.close();
      })()
        .catch(() => {
          assert.fail();
        })
        .finally(() => {
          done();
        });
    });
  });


  describe("error page tests", () => {

    it("should return a 404 not found error", (done) => {

      let browser: puppeteer.Browser;

      (async () => {
        browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(appURL + "/page-not-found")
          .then((res) => {
            assert.strictEqual(res.status(), 404);
          })
          .catch(() => {
            assert.fail();
          });

        await browser.close();
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
