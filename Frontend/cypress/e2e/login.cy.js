// cypress/integration/login.cy.js

describe("User Login", () => {
  it("should log in with valid credentials", () => {
    // Visit the landing page
    cy.visit("/");

    // Click the login button in the navbar to open the AuthModal
    cy.get('nav button:contains("Log In")').click();

    // Wait for the AuthModal to appear
    //cy.get('[role="dialog"]').should('be.visible');

    // Enter email
    cy.get('input[id="email"]').type("testuser@example.com");

    // Enter password
    cy.get('input[id="password"]').type("password123");

    // Click the login button to submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the AuthModal is closed
    cy.get('[role="dialog"]').should("not.exist");

    // Verify that the login button in the navbar has changed to "Log Out"
    //cy.get('nav button:contains("Log Out")').should("be.visible");

    // Or if the URL changes after login:
    cy.url().should('include', '/admin-dashboard');
  });
});
