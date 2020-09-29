import * as assert from "assert";

import * as puppeteer from "puppeteer";

import * as http from "http";
import * as app from "../app";


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
    } catch (_e) {
      // ignore
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
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(productsURL);

        await browser.close();
      })()
        .finally(() => {
          done();
        });
    });

    it("should load checkout page - " + checkoutURL, (done) => {
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(checkoutURL);

        await browser.close();
      })()
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

        let status = 0;

        await page.goto(appURL + "/page-not-found")
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
      })()
        .catch(() => {
          assert.fail();
        })
        .finally(() => {
          // eslint-disable-next-line no-void
          void browser.close();
        });
    });
  });
});
