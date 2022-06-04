it('entire ticket purchase successful flow', () => {
	cy.task('db:reset');
	cy.visit('/shows');
	// cy.findAllByRole('button', {name: /tickets/i})
	cy.findAllByRole('button', { name: /tickets/i })
		.eq(1)
		.click();

	// sign in
	// enter sign in credentials
	cy.findByLabelText(/email address/i)
		.clear()
		.type(Cypress.env('TEST_USER_EMAIL'));

	cy.findByLabelText(/password/i)
		.clear()
		.type(Cypress.env('TEST_PASSWORD'));

	// submit the form
	cy.findByRole('main').within(() => {
		cy.findByRole('button', { name: /sign in/i }).click();
	});

	// right band page ?
	cy.findByRole('heading', { name: /the joyous nun riot/i }).should('exist');
	cy.findByRole('spinbutton').clear().type(5);
	cy.findByRole('button', { name: /purchase/i }).click();
	cy.findByRole('heading', { name: /Ticket Purchase Confirmation/i }).should('exist');

	// added to tickets ?
	cy.findByRole('button', { name: /see all purchases/i }).click();
	cy.findByText(/the joyous nun riot/i).should('exist');

	// 95 seats left ?
	cy.visit('/shows');
	cy.findByRole('heading', { name: /the joyous nun riot/i }).should('exist');
	cy.findAllByRole('button', { name: /tickets/i })
		.eq(1)
		.click();
	cy.findByText(/95 seats left/i).should('exist');

	// sign out
	cy.findByRole('button', { name: /sign out/i }).click();
	cy.findByRole('button', { name: Cypress.env('TEST_USER_EMAIL') }).should('not.exist');
});
