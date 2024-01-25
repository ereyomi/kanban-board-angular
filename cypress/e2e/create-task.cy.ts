describe('Create and View task', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the initial project page', () => {
    cy.contains('Ereyomi Board');
    cy.get('[data-cy="no-data-display"]').should('be.visible');
  });

  it('Create and View task', () => {
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
    cy.get('[ data-cy="task-column-input"]').clear().type(taskColumnTwo);
    cy.get('[data-cy="add-task-status"]').click();
    cy.get('[data-cy="error-div-for-task-column-exist"]').should('not.exist');

    cy.get('[data-cy="task-list-component"]').should('have.length', 2);

    // get list component and create tasks
    cy.get('[data-cy="task-list-component"]').each(($el) => {
      const label = $el.find('[data-cy="task-column-label"]').text().trim();

      if (label === taskColumnOne) {
        cy.wrap($el.find('[data-cy="to-add-task"]')).click();

        // does the drop down button have the test
        cy.get('[data-cy="drop-down-label"]').should(
          'have.text',
          taskColumnOne
        );

        // ADD TASK
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
        cy.get('[data-cy="drop-down-option"]').contains(taskColumnTwo).click();

        // change status to in progress
        cy.get('[data-cy="drop-down-toggle-button"]').click();
        cy.get('[data-cy="drop-down-option"]').contains(taskColumnOne).click();

        // create task
        cy.get('[data-cy="create-task"]').click();

        // -----------------------------

        // ADD SECOND TASK TASK

        cy.wrap($el.find('[data-cy="to-add-task"]')).click();

        cy.get('[formControlName="title"]').type('Study For Exam');

        cy.get('[formControlName="about"]').type(
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
        );

        // add a sub task
        cy.get('[data-cy="add-sub-task-button"]').click();
        cy.get('[data-cy="sub-task-input-0"]').type('Prepare a time table');

        // add another sub task
        cy.get('[data-cy="add-sub-task-button"]').click();
        cy.get('[data-cy="sub-task-input-1"]').type(
          'Write out list of required entry subject'
        );

        // add another sub task
        cy.get('[data-cy="add-sub-task-button"]').click();
        cy.get('[data-cy="sub-task-input-2"]').type('Setup Desk');

        // create task
        cy.get('[data-cy="create-task"]').click();
      }
    });

    cy.wait(800);

    // move already created task
    cy.get('[data-cy="task-list-component"]').each(($el) => {
      const label = $el.find('[data-cy="task-column-label"]').text().trim();
      if (label === taskColumnOne) {
        const taskView = cy.get('[data-cy="sm-view-task-div"]');
        taskView.should('exist');
        taskView.should('have.length', 2);
        taskView.each(($el, index) => {
          // move first task to in progress
          if (index === 0) {
            // open view
            cy.wrap($el).click();
            cy.get('[data-cy="view-task-modal-div"]')
              .should('exist')
              .should('be.visible');

            cy.get('[data-cy="view-sub-task-input-0"]').should('exist').check();

            // open drop down first
            cy.get('[data-cy="drop-down-toggle-button"]').click();

            // change status to todo
            cy.get('[data-cy="drop-down-option"]')
              .contains(taskColumnTwo)
              .click();

            // click
            cy.get('[data-cy="view-task-modal-close-btn"]')
              .should('be.visible')
              .click();
          }
        });
      }
    });
  });
});
