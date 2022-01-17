describe('Main page tests', () => {
  it('should load the initial project page', () => {
    cy.visit('/');
    cy.contains('Search for GitHub user');
    cy.title().should('equal', 'GitHub User Search');
  });

  function confirmPageTwoOfAbc() {
    cy.get('span').should('have.text', 'Page 2');
    cy.get('.user-result').should('have.length', 10);
    cy.get('.user-result:nth-of-type(1)').should('contain.text', 'k');
    cy.get('[aria-label="Get previous page of results"]').should('be.visible');
    cy.get('[aria-label="Get next page of results"]').should('be.visible');
  }

  it('should paginate 26 results into 3 pages', () => {
    cy.visit('/');
    cy.get('input').type('abcdefghijklmnopqrstuvwxyz');
    cy.get('button').click();

    cy.get('p').should('have.text', 'Found 26 results:');
    cy.get('span').should('have.text', 'Page 1');
    cy.get('.user-result').should('have.length', 10);
    cy.get('.user-result:nth-of-type(1)').should('contain.text', 'a');
    cy.get('[aria-label="Get previous page of results"]').should('not.exist');
    cy.get('[aria-label="Get next page of results"]').should('be.visible');
    cy.get('[aria-label="Get next page of results"]').click();

    confirmPageTwoOfAbc();
    cy.get('[aria-label="Get next page of results"]').click();

    cy.get('span').should('have.text', 'Page 3');
    cy.get('.user-result').should('have.length', 6);
    cy.get('.user-result:nth-of-type(1)').should('contain.text', 'u');
    cy.get('[aria-label="Get previous page of results"]').should('be.visible');
    cy.get('[aria-label="Get next page of results"]').should('not.exist');
  });

  it('should not alter results if search text is changed', () => {
    cy.visit('/');
    cy.get('input').type('abcdefghijklmnopqrstuvwxyz');
    cy.get('button').click();

    cy.get('span').should('have.text', 'Page 1');
    cy.get('[aria-label="Get next page of results"]').click();

    confirmPageTwoOfAbc();
    cy.get('[aria-label="Get next page of results"]').click();

    cy.get('span').should('have.text', 'Page 3');
    cy.get('input').clear().type('hello');
    cy.get('[aria-label="Get previous page of results"]').click();

    confirmPageTwoOfAbc();
    cy.get('input').should('have.value', 'abcdefghijklmnopqrstuvwxyz');
  });
});
