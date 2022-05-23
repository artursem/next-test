import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

test('Page has correct heading and image', () => {
	render(<Home />);
	const heading = screen.getByRole('heading', /welcome to popular concert venue/i);
	expect(heading).toBeInTheDocument();
});
