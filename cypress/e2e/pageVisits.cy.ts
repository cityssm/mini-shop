// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable unicorn/filename-case, promise/catch-or-return, promise/always-return */

import 'cypress-axe'

describe('Page Visits', () => {

  const pagesToVisit = ['/products', '/checkout']

  for (const pageToVisit of pagesToVisit) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    it(`Loads ${pageToVisit}`, () => {
      cy.visit(pageToVisit)
      cy.injectAxe()
      cy.checkA11y()
    })
  }
})
