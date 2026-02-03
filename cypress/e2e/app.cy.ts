describe('Pokédex App', () => {
  it('loads the app root', () => {
    cy.visit('/');
    cy.get('app-root').should('exist');
  });
});
