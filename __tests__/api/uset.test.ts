import { testApiHandler } from 'next-test-api-route-handler';
import userAuthHandler from '@/pages/api/users/index';

test('POST /api/users receives token with correct credentials', async () => {
	await testApiHandler({
		handler: userAuthHandler,
		test: async ({ fetch }) => {
			const res = await fetch({
				method: 'POST',
				headers: {
					'content-type': 'application/json', // Must use correct content type
				},
				body: JSON.stringify({
					email: 'test@test.test',
					password: 'test',
				}),
			});

			expect(res.status).toBe(200);
			const json = await res.json();

			expect(json).toHaveProperty('user');
			expect(json.user.id).toEqual(1);
			expect(json.user.email).toEqual('test@test.test');
			expect(json.user).toHaveProperty('token');
		},
	});
});
