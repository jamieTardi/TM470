import Login from '.';
import { render, screen } from '@testing-library/react';

describe('<Login />', () => {
	it('should render our HTML elements', () => {
		render(<Login />);
		const container = screen.getByTestId('login-container');
		const form = screen.getByTestId('login-form');
		const img = screen.getByTestId('login-img');
		expect(container).toBeInTheDocument();
		expect(form).toBeInTheDocument();
		expect(img).toBeInTheDocument();
	});
});
