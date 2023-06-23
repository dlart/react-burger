const ingredientTestId = '[data-testid="643d69a5c3f7b9001cfa093c"]';

describe('burger constructor test', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'api/auth/user',
      {fixture: 'user.json'},
    );
    
    cy.intercept(
      'POST',
      'api/orders',
      {fixture: 'order.json'},
    ).as('createOrder');
    
    window
    .localStorage
    .setItem(
      'accessToken',
      JSON.stringify('accessToken')
    );
    
    window
    .localStorage
    .setItem(
      'refreshToken',
      JSON.stringify('refreshToken')
    );
    
    cy.visit('/');
    
    cy.intercept(
      'GET',
      'api/ingredients',
      {fixture: 'ingredients.json',
    });
  });
  
  it('should handle ingredient modal', () => {
    cy.get(ingredientTestId).click();
    
    cy.get('[data-testid="modal-title"]').should(
      'have.text',
      'Детали ингредиента',
    );
    
    cy.get('[data-testid="modal-close-button"]').click();
    
    cy.get('[data-testid="constructor-title"]').should(
      'have.text',
      'Соберите бургер',
    );
  });
  
  it('should handle drag and drop and order', () => {
    cy.get(ingredientTestId).trigger('dragstart');
    
    cy.get('[data-testid="top-bun-drop-target"]').trigger('drop');
    
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c-ingredient-card"] .counter__num').should(
      'have.text',
      '2',
    );
    
    const anotherIngredientTestId = '[data-testid="643d69a5c3f7b9001cfa0941"]';
    
    cy.get(anotherIngredientTestId).trigger('dragstart');
    
    const ingredientDropTarget = '[data-testid="ingredient-drop-target"]';
    
    cy.get(ingredientDropTarget).trigger('drop');
    
    cy.get(anotherIngredientTestId).trigger('dragstart');
    
    cy.get(ingredientDropTarget).trigger('drop');
    
    cy.get('[data-testid="643d69a5c3f7b9001cfa0941-ingredient-card"] .counter__num').should(
      'have.text',
      '2',
    );
    
    cy.get('[data-testid="top-bun-drop-target"]').contains('Краторная булка N-200i');
    
    cy.get('[data-testid="bottom-bun-drop-target"]').contains('Краторная булка N-200i');
    
    cy.get(ingredientDropTarget).contains('Биокотлета из марсианской Магнолии');
    
    cy.get('[data-testid="order-button"]').click();
    
    cy.get('[data-testid="modal-order-number"]').should(
      'have.text',
      '1234',
    );
  });
});
