describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Ereyomi Board');
    cy.get('#add_task_status').click();
  });
});
