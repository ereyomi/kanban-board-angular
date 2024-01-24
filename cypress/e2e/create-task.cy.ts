describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

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

        cy.get('[data-cy="drop-down-label"]').should('have.text', taskColumn);
        // cy.get('[data-cy="drop-down-toggle-button"]').click()
        cy.get('[formControlName="title"]').type('Cooking tomorrow');

        cy.get('[formControlName="about"]').type(
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
        );

        cy.get('[formControlName="title"]').type('Cooking tomorrow');
      }
    });
  });
  /*  it('Visits the initial project page', () => {
    cy.get('[data-cy="drop-down-toggle-button"]').click();
  }); */
});
