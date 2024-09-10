/// <reference types="cypress" />

describe('Calculator E2E Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
    });
  
    it('performs basic addition', () => {
      cy.get('button').contains('2').click();
      cy.get('button').contains('+').click();
      cy.get('button').contains('3').click();
      cy.get('button').contains('=').click();
      cy.get('.current').should('have.text', '5');
    });
  
    it('performs special operation (square root)', () => {
      cy.get('button').contains('9').click();
      cy.get('button').contains('√').click();
      cy.get('.current').should('have.text', '3');
    });
  
    it('clears the display', () => {
      cy.get('button').contains('5').click();
      cy.get('button').contains('C').click();
      cy.get('.current').should('have.text', '');
    });
  
    it('updates history after calculation', () => {
      cy.get('button').contains('4').click();
      cy.get('button').contains('*').click();
      cy.get('button').contains('5').click();
      cy.get('button').contains('=').click();
      cy.get('.history-container').should('contain', '4 * 5 = 20');
    });
    
    });