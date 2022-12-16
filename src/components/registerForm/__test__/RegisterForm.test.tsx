import { render, screen } from "@testing-library/react";
import { Input } from "antd";
import { BrowserRouter } from "react-router-dom";
import RegisterForm from "../RegisterForm";

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
      <RegisterForm />
    </BrowserRouter>
  );
});

describe("Register Form", () => {
  it("should render username", () => {
    const placeholderElement = screen.getByPlaceholderText(/username/i);

    expect(placeholderElement).toBeInTheDocument();
  });

  it("should render email", () => {
    const placeholderElement = screen.getByPlaceholderText(/email/i);

    expect(placeholderElement).toBeInTheDocument();
  });

  it("should render password", () => {
    const testElement = screen.getByTestId("test-password-item");

    expect(testElement).toBeInTheDocument();
  });

  it("should render confirm password", () => {
    const testElement = screen.getByTestId("test-confirm-password-item");

    expect(testElement).toBeInTheDocument();
  });

  it("should render submit button", () => {
    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEnabled();
  });

  it("should render cancel link", () => {
    const linkElement = screen.getByText(/cancel/i);

    expect(linkElement).toBeInTheDocument();
  });
});
