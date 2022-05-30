it('skips client-side bundle, confirming data form ISR cache', () => {
	// https://glebbahmutov.com/blog/ssr-e2e/
	cy.request('/')
		.its('body')
		.then((html) => {
			// remove the scripts
			const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, '');
			cy.state('document').write(staticHtml);
		});
	cy.findAllByText(/2022 apr 1[456]/i).should('have.length.of', 3);
});
