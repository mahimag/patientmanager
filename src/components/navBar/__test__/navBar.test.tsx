import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../index";

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );
});
describe("Nav Bar", () => {
  it("should render patient link ", () => {
    const linkElement = screen.getByText(/patient manager/i);

    expect(linkElement).toHaveAttribute("href");
  });

  it("should render signout button ", () => {
    const btnElement = screen.getByText(/signout/i);

    expect(btnElement).toBeInTheDocument();
  });
});
