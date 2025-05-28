/// <reference types="cypress" />

describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('открывается по клику на карточку ингредиента', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').click();
    cy.get('[data-testid="modal-content"]').should('be.visible');
    cy.contains('Краторная булка N-200i').should('be.visible');
  });

  it('закрывается по клику на крестик', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').click();
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal-content"]').should('not.exist');
  });

  it('закрывается по клику на оверлей', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').click();
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal-content"]').should('not.exist');
  });
});
