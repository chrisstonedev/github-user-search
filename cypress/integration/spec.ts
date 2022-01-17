describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Search for GitHub user');
    cy.title().should('equal', 'GitHub User Search');
  });
});
