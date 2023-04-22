import Pill from ".";
import { render, screen } from "@testing-library/react";

jest.mock("components/icon/index.tsx", () => () => <div data-testid="icon" />);

describe("<Pill />", () => {
	it("should render the HTML components", () => {
		render(<Pill children={<div />} />);
		const container = screen.getByTestId("pill-container");
		expect(container).toBeInTheDocument();
	});
	it("should render the icon component if supplied an icon", () => {
		render(<Pill children={<div />} icon="maintenance" />);
		const icon = screen.getByTestId("icon");
		expect(icon).toBeInTheDocument();
	});
});
