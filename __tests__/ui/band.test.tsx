import { render, screen } from '@testing-library/react';

import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import BandPage from '@/pages/bands/[bandId]';

test('Band componbent displays correct band info', async () => {
	const { fakeBands } = await readFakeData();
	render(<BandPage band={fakeBands[0]} error={null} />);
	const heading = screen.getByRole('heading', {
		name: /wandering bunnies/i,
	});
	expect(heading).toBeInTheDocument();

	// image, description, link
});

test('Band component displays error', () => {
	render(<BandPage band={null} error='404' />);
	const newError = screen.getByRole('heading', {
		name: /could not retrieve band data: 404/i,
	});
	expect(newError).toBeInTheDocument();
});
