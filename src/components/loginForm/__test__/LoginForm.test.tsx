import axios from "axios";
import LoginForm from "../LoginForm";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("axios");

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
});

describe("Login Form", () => {
  it("should render email", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    const placeholderElement = screen.getByPlaceholderText(/email/i);

    expect(placeholderElement).toBeInTheDocument();
  });

  it("should render password", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    const placeholderElement = screen.getByPlaceholderText(/password/i);

    expect(placeholderElement).toBeInTheDocument();
  });

  it("should render submit button", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEnabled();
  });

  it("should render link", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/register/i);

    expect(linkElement).toBeInTheDocument();
  });
});

it("submits the login form and updates local storage on success", async () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );

  const placeholderElement = screen.getByPlaceholderText(/email/i);

  const passwordElement = screen.getByPlaceholderText(/password/i);

  const buttonElement = screen.getByTestId("login-form-btn");
  expect(buttonElement).toBeInTheDocument();

  (axios.post as jest.Mock).mockResolvedValue({
    data: {
      data: {
        accessToken: "accessToken",
        id: "1",
      },
    },
  });

  const mockNav = jest.fn();

  jest.mock("react-router-dom", () => {
    return {
      ...(jest.requireActual("react-router-dom") as any),
      useNavigate: mockNav,
    };
  });

  let resp;

  await act(async () => {
    fireEvent.change(placeholderElement, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(passwordElement, {
      target: { value: "test123" },
    });
    resp = await fireEvent.click(buttonElement);
  });

  expect(axios.post).toHaveBeenCalled();
  expect(resp).toEqual(true);
});

it("should call setIsLoading and catch an error when onFinish is called and request is unsuccessful", async () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );

  const placeholderElement = screen.getByPlaceholderText(/email/i);
  placeholderElement.nodeValue = "test@example.com";

  const passwordElement = screen.getByPlaceholderText(/password/i);
  passwordElement.nodeValue = "pass";

  const buttonElement = screen.getByTestId("login-form-btn");
  expect(buttonElement).toBeInTheDocument();

  const logSpy = jest.spyOn(console, "log");

  await act(async () => {
    fireEvent.change(placeholderElement, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(passwordElement, {
      target: { value: "test123" },
    });
    await fireEvent.click(buttonElement);
  });

  (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Request failed"));
  expect(logSpy).toHaveBeenCalled();
});
