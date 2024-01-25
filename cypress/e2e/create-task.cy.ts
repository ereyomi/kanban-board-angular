describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the initial project page', () => {
    cy.contains('Ereyomi Board');
    cy.get('[data-cy="no-data-display"]').should('be.visible');
  });

  it('Visits the initial project page', () => {
    // task columns
    const taskColumnOne = 'Todo';
    const taskColumnTwo = 'In Progress';

    cy.get('[data-cy="open-add-task-status-modal-button"]').click();
    // create first column
    cy.get('[ data-cy="task-column-input"]').type(taskColumnOne);
    cy.get('[data-cy="add-task-status"]').click();

    cy.get('[data-cy="open-add-task-status-modal-button"]').click();
    // try creating again. this shouldnt be possible

    cy.get('[ data-cy="task-column-input"]').type(taskColumnOne);
    cy.get('[data-cy="add-task-status"]').click();
    cy.get('[data-cy="error-div-for-task-column-exist"]').should('be.visible');

    // cls input value
    cy.get('[ data-cy="task-column-input"]').clear();
    cy.get('[ data-cy="task-column-input"]').type(taskColumnTwo);
    cy.get('[data-cy="add-task-status"]').click();
    cy.get('[data-cy="error-div-for-task-column-exist"]').should('not.exist');

    // get list component
    cy.get('[data-cy="task-list-component"]').each(($el) => {
      const label = $el.find('[data-cy="task-column-label"]').text().trim();

      if (label === taskColumnOne) {
        cy.wrap($el.find('[data-cy="to-add-task"]')).click();

        // does the drop down button have the test
        cy.get('[data-cy="drop-down-label"]').should(
          'have.text',
          taskColumnOne
        );

        cy.get('[formControlName="title"]').type('Cooking food');

        cy.get('[formControlName="about"]').type(
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
        );

        // add a sub task
        cy.get('[data-cy="add-sub-task-button"]').click();
        cy.get('[data-cy="sub-task-input-0"]').type('put on fire');

        // add another sub task
        cy.get('[data-cy="add-sub-task-button"]').click();
        cy.get('[data-cy="sub-task-input-1"]').type('put pot on fire');

        // open drop down first
        cy.get('[data-cy="drop-down-toggle-button"]').click();

        cy.get('div[data-cy="drop-down-option"]').should('have.length', 2);

        // change status to todo
        cy.get('[data-cy="drop-down-option"]').contains('Todo').click();

        // change status to in progress
        cy.get('[data-cy="drop-down-toggle-button"]').click();
        cy.get('[data-cy="drop-down-option"]').contains(taskColumnOne).click();

        // create task
        cy.get('[data-cy="create-task"]').click();
      }
    });
  });
  /*  it('Visits the initial project page', () => {
    cy.get('[data-cy="drop-down-toggle-button"]').click();
  }); */
});
