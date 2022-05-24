import { screen, render } from '@testing-library/react';

import { UserReservations } from '@/components/user/UserReservations';

test('component displays correct button', async () => {
	render(<UserReservations userId={1} />);
	const purchaseButton = await screen.findByText(/purchase more tickets/i);
	expect(purchaseButton).toBeInTheDocument();
});
