import assert from 'node:assert'
import http from 'node:http'
import { after, before, describe, it } from 'node:test'

import { shutdown as abuseCheckShutdown } from '@cityssm/express-abuse-points'
import * as puppeteer from 'puppeteer'

import { app } from '../app.js'
import * as configFunctions from '../helpers/configFunctions.js'

await describe('mini-shop', async () => {
  const httpServer = http.createServer(app)
  const portNumber = 52_525

  let serverStarted = false

  before(() => {
    httpServer.listen(portNumber)

    httpServer.on('listening', () => {
      serverStarted = true
    })
  })

  after(() => {
    try {
      abuseCheckShutdown()
      httpServer.close()
    } catch (error) {
      console.log(error)
      // ignore
    }
  })

  await it(`should start server starts on port ${portNumber.toString()}`, () => {
    assert.ok(serverStarted)
  })

  const appURL = `http://localhost:${portNumber.toString()}${configFunctions.getProperty('reverseProxy.urlPrefix')}`

  await describe('simple page tests', async () => {
    const urls = [
      // css
      appURL + '/stylesheets/style.min.css',

      // javascripts
      appURL + '/javascripts/cart.js',
      appURL + '/javascripts/checkout.js',
      appURL + '/javascripts/product-view.js',

      // libraries
      appURL + '/lib/bulma-webapp-js/cityssm.min.js',
      appURL + '/lib/formToObject/formToObject.min.js',

      // pages
      appURL + '/products',
      appURL + '/checkout'
    ]

    for (const url of urls) {
      await it('should load - ' + url, async () => {
        let browser: puppeteer.Browser

        try {
          browser = await puppeteer.launch()
          const page = await browser.newPage()

          await page
            .goto(url)
            .then((response) => {
              assert.strictEqual(response.status(), 200)
            })
            .catch(() => {
              assert.fail()
            })
        } catch {
          assert.fail()
        } finally {
          await browser.close()
        }
      })
    }
  })

  await describe('error page tests', async () => {
    await it('should return a 404 not found error', async () => {
      let browser: puppeteer.Browser

      try {
        browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page
          .goto(appURL + '/page-not-found')
          .then((response) => {
            assert.strictEqual(response.status(), 404)
          })
          .catch(() => {
            assert.fail()
          })
      } catch {
        assert.fail()
      } finally {
        await browser.close()
      }
    })
  })
})
