it('runs auth flow for successful login to protected reservations page', () => {
	// reset and go to reservations (show id = 0)
	cy.task('db:reset').visit('/reservations/0');

	// check for sign in form
	cy.findByRole('heading', { name: /sign in to your account/i }).should('exist');

	// no option to purchase tickets
	cy.findByRole('button', { name: /purchase/i }).should('not.exist');

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

	// check for purchase button and band name
	cy.findByRole('button', { name: /purchase/i }).should('exist');
	cy.findByRole('heading', { name: /wandering bunnies/i }).should('exist');

	// navbar has email address and sign out button
	cy.findByRole('button', { name: Cypress.env('TEST_USER_EMAIL') }).should('exist');
	cy.findByRole('button', { name: /sign out/i }).should('exist');

	// sign out not in the page
	cy.findByRole('button', { name: /sing in/i }).should('not.exist');
});

it('runs auth failure flow', () => {
	// reset and go to user
	cy.task('db:reset').visit('/user');

	// check for sign in form
	cy.findByRole('heading', { name: /sign in to your account/i }).should('exist');

	// no option to purchase tickets
	cy.findByRole('heading', { name: /your tickets/i }).should('not.exist');

	// find form and enter WRONG credentials
	cy.findByLabelText(/email address/i)
		.clear()
		.type('wrong@email');

	cy.findByLabelText(/password/i)
		.clear()
		.type('wrong');

	// submit the form
	cy.findByRole('main').within(() => {
		cy.findByRole('button', { name: /sign in/i }).click();
	});

	// sign in failed?
	cy.findByText(/sign in failed/i).should('exist');

	// no option to purchase tickets
	cy.findByRole('heading', { name: /your tickets/i }).should('not.exist');

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

	// check for purchase button and band name
	cy.findByRole('button', { name: /purchase/i }).should('exist');
	cy.findByRole('heading', { name: /wandering bunnies/i }).should('exist');
});

it('redirects to sign in for protected pages', () => {
	// fixtures ->
	cy.fixture('protected-pages.json').then((urls) => {
		urls.forEach(($url) => {
			cy.visit($url);
			cy.findByLabelText(/email address/i).should('exist');
			cy.findByLabelText(/password/i).should('exist');
		});
	});
});

it('does not show the sign in page when already signed in', () => {
	cy.task('db:reset').signIn(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_PASSWORD'));

	// go to reservations
	cy.visit('/reservations/0');
	cy.findByRole('button', { name: /sign in/i }).should('not.exist');
	cy.findByRole('heading', { name: /sign in/i }).should('not.exist');
	cy.findByRole('button', { name: /purchase/i }).should('exist');
});
