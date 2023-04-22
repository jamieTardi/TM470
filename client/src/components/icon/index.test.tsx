import Icon from '.'
import { render, screen } from "@testing-library/react";


describe("<Icon />" , () => {
    it("should render out our HTML elements", () => {
        render(<Icon type="confirm" />)
        const container = screen.getByTestId("icon-container")
        const title = screen.queryByTestId("title")
        const img = screen.getByTestId("image")

        expect(container).toBeInTheDocument()
        expect(title).not.toBeInTheDocument()
        expect(img).toBeInTheDocument()

    })

    it("should render out the title", () => {
        render(<Icon type="confirm" title="hello" />)
        const title = screen.getByTestId("title")
        const text = screen.getByText(/hello/)
        expect(title).toBeInTheDocument()
        expect(text).toBeInTheDocument()

    })
})