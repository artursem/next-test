import { rest } from 'msw';
import { fakeUserReservations } from '../fakeData/userReservations';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';

export const handlers = [
	// rest.get('http://localhost:3000/api/shows/:showId', async (req, res, ctx) => {
	// 	const { fakeShows } = await readFakeData();
	// 	return res(ctx.json({ show: fakeShows[0] }));
	// }),

	// showId = 0 has seats available
	// showId = 1 is sold out

	rest.get('http://localhost:3000/api/shows/:showId', async (req, res, ctx) => {
		const { fakeShows } = await readFakeData();
		const { showId } = req.params;
		return res(ctx.json({ show: fakeShows[Number(showId)] }));
	}),
	rest.get('http://localhost:3000/api/users/:userId/reservations', (req, res, ctx) => {
		const { userId } = req.params;
		if (userId === 0) {
			return res(
				ctx.json({
					userReservations: [],
				})
			);
		}
		return res(
			ctx.json({
				userReservations: fakeUserReservations,
			})
		);
	}),
];
