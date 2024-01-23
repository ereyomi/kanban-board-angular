describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Ereyomi Board');
    cy.get('[data-cy="open-add-task-status-modal-button"]').click();

    const taskColumn = 'In Progress';

    cy.get('[ data-cy="task-column-input"]').type(taskColumn);
    cy.get('[data-cy="add-task-status"]').click();

    cy.get('[data-cy="task-list-component"]').each(($el) => {
      const label = $el.find('[data-cy="task-column-label"]').text().trim();

      if (label === taskColumn) {
        cy.wrap($el.find('[data-cy="to-add-task"]')).click();
      }
    });
  });
});
