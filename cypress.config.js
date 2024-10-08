import { defineConfig } from 'cypress';
export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:52525',
        specPattern: 'cypress/e2e/*.cy.ts',
        supportFile: false,
        projectId: 'z3bdje'
    }
});
