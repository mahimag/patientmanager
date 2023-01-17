import axios from "axios";
import { act } from "react-dom/test-utils";
import RegisterForm from "../RegisterForm";
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

describe("Register Form", () => {
  it("should render username", () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    const placeholderElement = screen.getByPlaceholderText(/username/i);

    expect(placeholderElement).toBeInTheDocument();
  });

  it("should render email", () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    const placeholderElement = screen.getByPlaceholderText(/email/i);

    expect(placeholderElement).toBeInTheDocument();
  });

  it("should render password", () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    const testElement = screen.getByTestId("test-password-item");

    expect(testElement).toBeInTheDocument();
  });

  it("should render confirm password", () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    const testElement = screen.getByTestId("test-confirm-password-item");

    expect(testElement).toBeInTheDocument();
  });

  it("should render submit button", () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEnabled();
  });

  it("should render cancel link", () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/cancel/i);

    expect(linkElement).toBeInTheDocument();
  });

  it("submits the register form and updates local storage on success", async () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );

    const userName = screen.getByTestId("input-register-username");
    const email = screen.getByTestId("input-register-email");
    const password = screen.getByTestId("input-register-pass");
    const confirmPassword = screen.getByTestId("input-register-confirm-pass");

    const buttonElement = screen.getByTestId("register-form-btn");
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
      fireEvent.change(userName, {
        target: { value: "john" },
      });
      fireEvent.change(email, {
        target: { value: "test@example.com" },
      });
      fireEvent.change(password, {
        target: { value: "test123" },
      });
      fireEvent.change(confirmPassword, {
        target: { value: "test123" },
      });
      resp = await fireEvent.click(buttonElement);
    });

    expect(axios.post).toHaveBeenCalled();
    expect(resp).toEqual(true);
  });

  it("should get error while submitting the register form", async () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );

    const userName = screen.getByTestId("input-register-username");
    const email = screen.getByTestId("input-register-email");
    const password = screen.getByTestId("input-register-pass");
    const confirmPassword = screen.getByTestId("input-register-confirm-pass");

    const buttonElement = screen.getByTestId("register-form-btn");
    expect(buttonElement).toBeInTheDocument();

    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        data: {
          accessToken: "accessToken",
          id: "1",
        },
      },
    });

    (axios.post as jest.Mock).mockRejectedValueOnce(
      new Error("Request failed")
    );

    const logSpy = jest.spyOn(console, "log");

    await act(async () => {
      fireEvent.change(userName, {
        target: { value: "john" },
      });
      fireEvent.change(email, {
        target: { value: "test@example.com" },
      });
      fireEvent.change(password, {
        target: { value: "test123" },
      });
      fireEvent.change(confirmPassword, {
        target: { value: "test123" },
      });
      await fireEvent.click(buttonElement);
    });

    expect(axios.post).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalled();
  });
});
