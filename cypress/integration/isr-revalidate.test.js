import { generateNewBand } from '../../__tests__/__mocks__/fakeData/newBand';
import { generateRandomId } from '../../lib/features/reservations/utils';
import { response } from 'msw';

it('should load refreshed page from cache after new band is added', () => {
	// check if band in on page
	// cy.task('db:reset')
	cy.visit('/bands');
	// cy.findByRole('heading', { name: /avalanche of cheese/i }).should('not.exist');

	// add new band POST
	const bandId = generateRandomId();
	const band = generateNewBand(bandId);
	const secret = Cypress.env('REVALIDATION_SECRET');

	cy.request('POST', `/api/bands?secret=${secret}`, { newBand: band }).then((response) => {
		expect(response.body.revalidated).to.equal(true);
	});

	// reload page, new band appears
	cy.reload();
	cy.findByRole('heading', { name: /avalanche of cheese/i }).should('exist');

	// reset isr cache to initial db conditions
	cy.resetDbAndIsrCache();
});
