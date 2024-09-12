/// <reference types="cypress" />

/**
 * E2E Tests for the Calculator application.
 * 
 * They verify the functionality of arithmetic operations, 
 * display clearing, and calculation history tracking.
 */

describe('Calculator E2E Tests', () => {

  /**
   * Ensure the calculator is loaded.
   */
  beforeEach(() => {
      cy.visit('http://localhost:3000'); 
  });

  /**
   * Test case for performing a basic addition operation.
   */
  it('performs basic addition', () => {
      cy.get('button').contains('2').click();
      cy.get('button').contains('+').click();
      cy.get('button').contains('3').click();
      cy.get('button').contains('=').click();
      cy.get('.current').should('have.text', '5');
  });

  /**
   * Test case for performing a special operation (square root).
   */
  it('performs special operation (square root)', () => {
      cy.get('button').contains('9').click();
      cy.get('button').contains('√').click();
      cy.get('.current').should('have.text', '3');
  });

  /**
   * Test case for clearing the calculator display.
   */
  it('clears the display', () => {
      cy.get('button').contains('5').click();
      cy.get('button').contains('C').click();
      cy.get('.current').should('have.text', '');
  });

  /**
   * Test case for verifying that the calculator's history 
   * is updated correctly after a calculation.
   */
  it('updates history after calculation', () => {
      cy.get('button').contains('4').click();
      cy.get('button').contains('*').click();
      cy.get('button').contains('5').click();
      cy.get('button').contains('=').click();
      cy.get('.history-container').should('contain', '4 * 5 = 20');
  });
});
