import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../LoginForm";

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
      <LoginForm />
    </BrowserRouter>
  );
});

describe("Login Form", () => {
  it("should render email", () => {
    const placeholderElement = screen.getByPlaceholderText(/email/i);

    expect(placeholderElement).toBeInTheDocument();
  });

  it("should render password", () => {
    const placeholderElement = screen.getByPlaceholderText(/password/i);

    expect(placeholderElement).toBeInTheDocument();
  });

  it("should render submit button", () => {
    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEnabled();
  });

  it("should render link", () => {
    const linkElement = screen.getByText(/register/i);

    expect(linkElement).toBeInTheDocument();
  });
});
