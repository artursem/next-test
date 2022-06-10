module.exports = {
	esModule: true,
	validateToken: jest.fn().mockResolvedValue(true),
};

// to satisfy TypeScript
export {};

// mock module in any module
// jest.mock('@/lib/lib/auth/utils');
