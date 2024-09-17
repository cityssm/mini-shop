import assert from 'node:assert'

import * as configFunctions from '../helpers/configFunctions.js'

describe('configFunctions - properties with default values', () => {
  describe('application', () => {
    it('should return a number from application.httpPort', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('application.httpPort'),
        'number'
      )
    })
  })

  it('should return a function from orderNumberFunction', () => {
    assert.strictEqual(
      typeof configFunctions.getProperty('orderNumberFunction'),
      'function'
    )
  })

  describe('site.header', () => {
    it('should return a string from site.header.backgroundColorClass', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('site.header.backgroundColorClass'),
        'string'
      )
    })
  })

  describe('site.footer', () => {
    it('should return a boolean from site.footer.isVisible', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('site.footer.isVisible'),
        'boolean'
      )
    })

    it('should return a string from site.footer.backgroundColorClass', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('site.footer.backgroundColorClass'),
        'string'
      )
    })

    it('should return a string from site.footer.textColorClass', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('site.footer.textColorClass'),
        'string'
      )
    })

    it('should return a string from site.footer.footerEjs', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('site.footer.footerEjs'),
        'string'
      )
    })
  })

  describe('views.products', () => {
    it('should return a string from views.products.title', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('views.products.title'),
        'string'
      )
    })
  })

  describe('views.checkout', () => {
    it('should return a string from views.checkout.title', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('views.checkout.title'),
        'string'
      )
    })
  })

  describe('views.checkout_shipping', () => {
    it('should return a string from views.checkout_shipping.title', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('views.checkout_shipping.title'),
        'string'
      )
    })
  })

  describe('views.toPayment', () => {
    it('should return a string from views.toPayment.headerEjs', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('views.toPayment.headerEjs'),
        'string'
      )
    })
  })

  describe('views.order.title', () => {
    it('should return a string from views.order.title', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('views.order.title'),
        'string'
      )
    })

    it('should return a string from views.order.headerEjs', () => {
      assert.strictEqual(
        typeof configFunctions.getProperty('views.order.headerEjs'),
        'string'
      )
    })
  })
})
