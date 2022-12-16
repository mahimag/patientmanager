import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";

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
      <Home />
    </BrowserRouter>
  );
});

describe("Home", () => {
  it("should render a title", () => {
    const titleElement = screen.getByTestId("test-home-title");

    expect(titleElement).toBeInTheDocument();
  });

  it("should render an add patient button", () => {
    const btnElement = screen.getByTestId("test-home-btn");

    expect(btnElement).toBeInTheDocument();
    expect(btnElement).toBeEnabled();
  });
});
