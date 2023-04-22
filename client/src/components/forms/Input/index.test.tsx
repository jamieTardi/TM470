import Input from ".";
import { render, screen } from "@testing-library/react";



describe("<Input />", () => {
it("should render out HTML elements", () => {
 render(<Input title="Email" required={true} name="email" setValueUpdate={() => {console.log("something")}} valueUpdate={{}}/>)

    const container = screen.getByTestId("container")
    expect(container).toBeInTheDocument()
})
})