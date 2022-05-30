it('skips client-side bundle, confirming data form ISR cache', () => {
	// https://glebbahmutov.com/blog/ssr-e2e/
	cy.request('/bands')
		.its('body')
		.then((html) => {
			// remove the scripts
			const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, '');
			cy.state('document').write(staticHtml);
		});
	cy.findByRole('heading', { name: /shamrock pete/i }).should('exist');
	cy.findByRole('heading', { name: /the joyous nun riot/i }).should('exist');
	cy.findByRole('heading', { name: /the wandering bunnies/i }).should('exist');
});
