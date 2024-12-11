describe('User Registration', () => {
  beforeEach(() => {
    // Reset to the landing page before each test
    cy.visit('/');
  });

  it('should successfully register a new student', () => {
    // Click on Get Started or navigate to signup
    // Click the login button in the navbar to open the AuthModal
    cy.get('nav button:contains("Log In")').click();

    // Click the login button in the navbar to open the AuthModal
    cy.get('button:contains("Sign up")').click();

    // Fill out the registration form
    cy.get('#name').type('Test Student');
    cy.get('#email').type(`test-student-${Date.now()}@example.com`);
    cy.get('#password').type('StrongPassword123!');
    cy.get('#role').select('Student/Job Seeker');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert successful registration 
    // This could be a redirect, a success message, or checking user is logged in
    cy.url().should('include', '/student-dashboard');
    //cy.get('[data-testid="user-profile"]').should('be.visible');
  });

  it('should show error for invalid registration', () => {
    // Click the login button in the navbar to open the AuthModal
    cy.get('nav button:contains("Log In")').click();

    // Click the login button in the navbar to open the AuthModal
    cy.get('button:contains("Sign up")').click();



    // Submit form with empty fields
    cy.get('button[type="submit"]').click();

    // Check for validation errors
    cy.get('input:invalid').should('have.length', 3);
  });

  it('should register a career coach', () => {
    // Click the login button in the navbar to open the AuthModal
    cy.get('nav button:contains("Log In")').click();

    // Click the login button in the navbar to open the AuthModal
    cy.get('button:contains("Sign up")').click();

    // Fill out the registration form for a coach
    cy.get('#name').type('Test Coach');
    cy.get('#email').type(`test-coach-${Date.now()}@example.com`);
    cy.get('#password').type('CoachPassword456!');
    cy.get('#role').select('Career Coach');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert successful registration 
    cy.url().should('include', '/coach-dashboard');
  });

  it('should disable submit button while loading', () => {
    // Click the login button in the navbar to open the AuthModal
    cy.get('nav button:contains("Log In")').click();

    // Click the login button in the navbar to open the AuthModal
    cy.get('button:contains("Sign up")').click();

    // Fill out the form
    cy.get('#name').type('Test User');
    cy.get('#email').type(`test-user-${Date.now()}@example.com`);
    cy.get('#password').type('StrongPassword123!');

    // Mock the signup to simulate loading state
    cy.intercept('POST', '/api/auth/register', {
      delay: 1000,
      statusCode: 200,
      body: { success: true }
    });

    // Click submit
    cy.get('button[type="submit"]')
      .should('not.be.disabled')
      .click();

    // Check that button is disabled during submission
    cy.get('button[type="submit"]')
      .should('be.disabled')
      .and('contain', 'Creating Account...');

    // Wait for the request to complete
    cy.wait(1000);

    // Check that button is re-enabled after submission
    cy.get('button[type="submit"]')
      .should('not.be.disabled')
      .and('contain', 'Create Account');
  });
});