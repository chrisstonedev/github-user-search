describe('Main page tests', () => {
  it('should load the initial project page', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', 'GitHub User Search');
    cy.title().should('equal', 'GitHub User Search');
  });

  it('should load multiple paginated results', () => {
    cy.visit('/');
    cy.get('#userSearch').type('chrisstone');
    cy.get('button').click();
    cy.get('.total-count').should('have.text', 'Found 24 results:');
    cy.get('#next').click();
    cy.get('#next').click();
    cy.get('span').should('have.text', 'Page 3');
    cy.get('#next').should('not.exist');
  });

  it('should load a single unique result', () => {
    cy.visit('/');
    cy.get('#userSearch').type('chrisstonedev{enter}');
    cy.get('.total-count').should('have.text', 'Found 1 result:');
  });
});
