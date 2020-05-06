// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

before(() => {
  cy.request("GET", "/api/auth/mock");
  cy.request("DELETE", "/api/events");
  cy.request("POST", "/api/events", {
    title: "Test event",
    type: "LESSON_CLARIFICATIONS",
    allDay: false,
    participants: ["fake-email"]
  });
  cy.visit("http://localhost:3000");
  cy.request("GET", "/api/user")
    .its("body")
    .as("currentUser");
});

beforeEach(() => {
  Cypress.Cookies.debug(true, { verbose: false });

  Cypress.Cookies.defaults({
    whitelist: cookie => {
      // implement your own logic here
      // if the function returns truthy
      // then the cookie will not be cleared
      // before each test runs
      return true;
    }
  });
});

/*
after(() => {
  cy.request('DELETE', '/api/events');
});
*/
