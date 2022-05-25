import { screen, render } from '@testing-library/react';

import { UserReservations } from '@/components/user/UserReservations';

test('component displays correct button', async () => {
	render(<UserReservations userId={1} />);
	const purchaseButton = await screen.findByText(/purchase more tickets/i);
	expect(purchaseButton).toBeInTheDocument();
});

test('component shows `purchase tickets` button if no reservations', async () => {
	render(<UserReservations userId={0} />);
	const purchaseMoreButton = screen.queryByText(/purchase more tickets/i);
	const yourTickets = screen.queryByRole('heading', { name: /your tickets/i });
	const purchaseButton = await screen.findByText(/purchase tickets/i);

	expect(purchaseMoreButton).not.toBeInTheDocument();
	expect(yourTickets).not.toBeInTheDocument();
	expect(purchaseButton).toBeInTheDocument();
});
