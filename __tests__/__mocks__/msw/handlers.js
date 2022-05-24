import { rest } from 'msw';

import { readFakeData } from '@/__tests__/__mocks__/fakeData';

export const handlers = [
	rest.get('http://localhost:3000/api/shows/:showId', async (req, res, ctx) => {
		const { fakeShows } = await readFakeData();
		return res(ctx.json({ show: fakeShows[0] }));
	}),
];
