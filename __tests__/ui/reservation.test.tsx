import { render, screen } from '@testing-library/react';

import { Reservation } from '@/components/reservations/Reservation';

test('Component shows correct number of seats', async () => {
	render(<Reservation showId={0} submitPurchase={jest.fn()} />);

	const seatCount = await screen.findByText(/10 seats left/i);
	expect(seatCount).toBeInTheDocument();
});
