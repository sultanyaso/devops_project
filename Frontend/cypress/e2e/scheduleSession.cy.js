// cypress/integration/scheduleSession.spec.js

describe("Schedule a Coaching Session", () => {
  beforeEach(() => {
    // Log in before each test
    cy.login("testuser@example.com", "password123");
  });

  it("should schedule a coaching session", () => {
    // Visit the coaching session scheduler page
    cy.visit("/schedule-session");

    // Select a coach
    cy.get('select[name="coach"]').select("Coach John Doe");

    // Select a date
    cy.get('input[name="date"]').type("2024-05-15");

    // Select a time slot
    cy.get("button").contains("10:00 AM").click();

    // Enter the session topic
    cy.get('textarea[name="topic"]').type("Career Development");

    // Click the confirm booking button
    cy.get("button").contains("Confirm Booking").click();

    // Verify that the session is scheduled
    cy.contains("Session scheduled successfully").should("be.visible");
  });
});
