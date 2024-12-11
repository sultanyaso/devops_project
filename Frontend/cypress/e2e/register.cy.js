// cypress/integration/login.cy.js

describe("User Login", () => {
  beforeEach(() => {
    // Visit the landing page before each test
    cy.visit("/");
  });

  it("should log in with valid credentials", () => {
    // Click the login button in the navbar to open the AuthModal
    cy.get("nav").contains("Log In").click();

    // Wait for the AuthModal to appear
    //cy.get('[role="dialog"]').should("be.visible");

    // Enter email
    cy.get('input[type="email"]').type("test@example.com");

    // Enter password
    cy.get('input[type="password"]').type("password123");

    // Submit the form
    cy.get("form").submit();

    // Check if login was successful
    // This could be checking for a welcome message, a dashboard URL, or the navbar changing
    cy.get("nav").should("contain", "Log Out");
    // or
    // cy.url().should('include', '/dashboard');
  });

  it("should show an error message with invalid credentials", () => {
    // Click the login button in the navbar to open the AuthModal
    cy.get("nav").contains("Log In").click();

    // Wait for the AuthModal to appear
    cy.get('[role="dialog"]').should("be.visible");

    // Enter invalid email
    cy.get('input[type="email"]').type("invalid@example.com");

    // Enter invalid password
    cy.get('input[type="password"]').type("wrongpassword");

    // Submit the form
    cy.get("form").submit();

    // Check for error message
    cy.get(".text-red-500")
      .should("be.visible")
      .and("contain", "Failed to log in");
  });

  it("should toggle between login and signup forms", () => {
    // Click the login button in the navbar to open the AuthModal
    cy.get("nav").contains("Log In").click();

    // Wait for the AuthModal to appear
    cy.get('[role="dialog"]').should("be.visible");

    // Check if we're on the login form
    cy.get("form").should("contain", "Log In");

    // Click to switch to signup form
    cy.contains("Create an account").click();

    // Check if we're on the signup form
    cy.get("form").should("contain", "Create Account");

    // Click to switch back to login form
    cy.contains("Already have an account?").click();

    // Check if we're back on the login form
    cy.get("form").should("contain", "Log In");
  });
});
