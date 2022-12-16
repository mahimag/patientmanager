import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../Register";

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
      <Register />
    </BrowserRouter>
  );
});

describe("Register", () => {
  it("should render a title", () => {
    const titleElement = screen.getByText(/register/i);
    expect(titleElement).toBeInTheDocument();
  });
});
