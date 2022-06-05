import { testApiHandler } from 'next-test-api-route-handler';

import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import showsHandler from '@/pages/api/shows/index';

test('/api/shows returns shows from the db', async () => {
	await testApiHandler({
		handler: showsHandler,
		test: async ({ fetch }) => {
			const res = await fetch({ method: 'GET' });
			expect(res.status).toBe(200);
			const json = await res.json();

			const { fakeShows } = await readFakeData();
			expect(json).toEqual({ shows: fakeShows });
		},
	});
});
