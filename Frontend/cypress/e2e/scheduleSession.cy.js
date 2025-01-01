// cypress/integration/scheduleSession.spec.js

describe("Schedule a Coaching Session", () => {
  beforeEach(() => {
    // Visit the landing page
    cy.visit("/");

    // Click the login button in the navbar to open the AuthModal
    cy.get('nav button:contains("Log In")').click();

    // Enter email
    cy.get('input[id="email"]').type("testuser@example.com");

    // Enter password
    cy.get('input[id="password"]').type("password123");

    // Click the login button to submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the AuthModal is closed
    cy.get('[role="dialog"]').should("not.exist");

    // The URL changes after login:
    cy.url().should("include", "/student-dashboard");
  });

  it("should schedule a coaching session", () => {
    // Open the coach list
    cy.get('div[title="Schedule Coaching"]').click();

    // Select a coach (assuming the first coach in the list)
    cy.get('[data-testid="coach-item"]').first().click();

    // Select a date using react-datepicker
    cy.get(".react-datepicker__input-container input").click();
    cy.get(".react-datepicker__day--today").next().click();

    // Select a time slot
    cy.contains("button", "10:00 AM").click();

    // Enter the session topic
    cy.get(
      'textarea[placeholder="What would you like to discuss in this session?"]'
    ).type("Career Development Strategies");

    // Click the confirm booking button
    cy.get("button").contains("Confirm Booking").click();

    // Verify that the session is added to the upcoming sessions list
    cy.contains("h2", "Upcoming Sessions").should("be.visible");
    cy.contains("Career Development Strategies").should("be.visible");
  });

  it("should prevent scheduling without all required information", () => {
    // Open the coach list
    cy.get('div[title="Schedule Coaching"]').click();

    // Select a coach
    cy.get('[data-testid="coach-item"]').first().click();

    // Try to submit without filling out all fields
    cy.get("button").contains("Confirm Booking").should("be.disabled");

    // Select a date
    cy.get(".react-datepicker__input-container input").click();
    cy.get(".react-datepicker__day--today").next().click();

    // Select a time slot
    cy.contains("button", "10:00 AM").click();

    // Button should still be disabled without a topic
    cy.get("button").contains("Confirm Booking").should("be.disabled");

    // Enter topic
    cy.get(
      'textarea[placeholder="What would you like to discuss in this session?"]'
    ).type("Career Development Strategies");

    // Button should now be enabled
    cy.get("button").contains("Confirm Booking").should("be.enabled");
  });
});
