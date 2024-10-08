import 'cypress-axe';
describe('Page Visits', () => {
    const pagesToVisit = ['/products', '/checkout'];
    for (const pageToVisit of pagesToVisit) {
        it(`Loads ${pageToVisit}`, () => {
            cy.visit(pageToVisit);
            cy.injectAxe();
            cy.checkA11y();
        });
    }
});
