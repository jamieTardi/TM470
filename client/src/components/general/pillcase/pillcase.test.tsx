import { render, screen } from "@testing-library/react";
import Pillcase from ".";

describe("<Pillcase />", () => {
	beforeEach(() => {
		render(<Pillcase children={<div data-testid="pill" />} />);
	});
	it("should render our HTML elements", () => {
		const container = screen.getByTestId("pillcase-container");
		const pill = screen.getByTestId("pill");

		expect(container).toBeInTheDocument();
		expect(pill).toBeInTheDocument();
	});
});
