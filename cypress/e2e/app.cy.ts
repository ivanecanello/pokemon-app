describe('Pokédex App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Landing Page', () => {
    it('loads the app root', () => {
      cy.get('app-root').should('exist');
    });

    it('displays pokemon cards on load', () => {
      cy.get('app-landing').should('exist');
      // Wait for pokemon cards to load
      cy.get('.pokemon-card', { timeout: 10000 }).should('have.length.greaterThan', 0);
    });

    it('allows searching pokemon by name', () => {
      // Find search input by id
      cy.get('#name-search').type('bulba');
      
      // Verify pokemon with 'bulba' in name is displayed
      cy.contains(/bulba/i, { timeout: 5000 }).should('be.visible');
    });

    it('allows filtering pokemon by type', () => {
      // Select Fire type from dropdown
      cy.get('#type-select').select('Fire', { force: true });
      
      // Verify pokemon cards are displayed
      cy.get('.pokemon-card', { timeout: 5000 }).should('have.length.greaterThan', 0);
    });

    it('displays pagination controls', () => {
      // Look for pagination buttons
      cy.get('.pagination-btn, .page-btn').should('have.length.greaterThan', 0);
    });

    it('navigates to pokemon detail page when clicking a card', () => {
      // Click first pokemon card
      cy.get('.pokemon-card').first().click();
      
      // Verify we're on detail page
      cy.get('.detail-container, app-detail', { timeout: 5000 }).should('exist');
    });

    it('clears filters when clicking clear button', () => {
      // Set a filter
      cy.get('#name-search').type('bulba');
      
      // Click clear filters button
      cy.get('.clear-btn').click();
      
      // Verify input is cleared
      cy.get('#name-search').should('have.value', '');
    });
  });

  describe('Detail Page', () => {
    it('navigates to detail page and displays pokemon stats', () => {
      // Click first pokemon card
      cy.get('.pokemon-card').first().click();
      
      // Verify detail page loads
      cy.get('.detail-container', { timeout: 5000 }).should('exist');
      
      // Verify stats section is displayed
      cy.get('.stats-section', { timeout: 5000 }).should('exist');
      cy.contains(/HP|Attack|Defense/i).should('be.visible');
    });

    it('displays pokemon image and name on detail page', () => {
      // Click first pokemon
      cy.get('.pokemon-card').first().click();
      
      // Verify detail page and content exist
      cy.get('.detail-container', { timeout: 5000 }).should('exist');
      
      // Verify image exists
      cy.get('.detail-header img', { timeout: 5000 }).should('be.visible');
      
      // Verify name is displayed
      cy.get('.pokemon-detail h1', { timeout: 5000 }).should('be.visible');
    });

    it('can go back to landing page from detail', () => {
      // Navigate to detail
      cy.get('.pokemon-card').first().click();
      cy.get('.detail-container', { timeout: 5000 }).should('exist');
      
      // Click back button
      cy.get('.back-btn').click();
      
      // Verify we're back on landing (pokemon grid exists)
      cy.get('.pokemon-grid', { timeout: 5000 }).should('exist');
    });

    it('displays pokemon description on detail page', () => {
      // Click first pokemon
      cy.get('.pokemon-card').first().click();
      
      // Verify description section exists
      cy.get('.description-section', { timeout: 5000 }).should('exist');
      cy.get('.description-section h2').should('contain', 'Description');
    });
  });

  describe('Pagination', () => {
    it('can navigate between pages', () => {
      // Get initial pokemon on page 1
      cy.get('.pokemon-card').first().then(($firstCard) => {
        const firstPokemonName = $firstCard.text();
        
        // Try to click page 2 button
        cy.get('.page-btn').contains('2').click({ force: true });
        
        // Verify we're on a different page (pokemon changed)
        cy.get('.pokemon-card').first().should(($secondCard) => {
          expect($secondCard.text()).not.to.equal(firstPokemonName);
        });
      });
    });
  });
});
