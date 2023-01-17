import NavBar from "../index";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

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
describe("Nav Bar", () => {
  it("should render patient link ", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/patient manager/i);

    expect(linkElement).toHaveAttribute("href");
  });

  it("should render signout button ", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const btnElement = screen.getByText(/signout/i);

    expect(btnElement).toBeInTheDocument();
  });

  it("testing", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const btnElement = screen.getByText(/signout/i);
    act(() => {
      btnElement.click();
    });
  });
});
