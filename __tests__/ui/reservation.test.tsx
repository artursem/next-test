import { render, screen } from '@testing-library/react';

import { Reservation } from '@/components/reservations/Reservation';

test('Component shows correct number of seats', async () => {
	render(<Reservation showId={0} submitPurchase={jest.fn()} />);

	const seatCount = await screen.findByText(/10 seats left/i);
	expect(seatCount).toBeInTheDocument();
});

test('reservation page shows "sold out" message and NO button if no seats available', async () => {
	render(<Reservation showId={1} submitPurchase={jest.fn()} />);
	const soldOut = await screen.findByText(/sold out/i);
	const purchaseButton = screen.queryByRole('button', { name: /purchase/i });

	expect(soldOut).toBeInTheDocument();
	expect(purchaseButton).not.toBeInTheDocument();
});
