import assert from 'node:assert'
import { describe, it } from 'node:test'

import * as configFunctions from '../helpers/configFunctions.js'

await describe('configFunctions - properties with default values', async () => {
  await describe('application', async () => {
    await it('should return a number from application.httpPort', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('application.httpPort'),
        'number'
      )
    })
  })

  await it('should return a function from orderNumberFunction', () => {
    assert.strictEqual(
      typeof configFunctions.getProperty('orderNumberFunction'),
      'function'
    )
  })

  await describe('site.header', async () => {
    await it('should return a string from site.header.backgroundColorClass', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('site.header.backgroundColorClass'),
        'string'
      )
    })
  })

  await describe('site.footer', async () => {
    await it('should return a boolean from site.footer.isVisible', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('site.footer.isVisible'),
        'boolean'
      )
    })

    await it('should return a string from site.footer.backgroundColorClass', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('site.footer.backgroundColorClass'),
        'string'
      )
    })

    await it('should return a string from site.footer.textColorClass', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('site.footer.textColorClass'),
        'string'
      )
    })

    await it('should return a string from site.footer.footerEjs', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('site.footer.footerEjs'),
        'string'
      )
    })
  })

  await describe('views.toPayment', async () => {
    await it('should return a string from views.toPayment.headerEjs', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('views.toPayment.headerEjs'),
        'string'
      )
    })
  })

  await describe('views.order.title', async () => {
    await it('should return a string from views.order.headerEjs', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('views.order.headerEjs'),
        'string'
      )
    })
  })
})
