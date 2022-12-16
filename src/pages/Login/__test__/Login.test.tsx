import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";

it("should render a title", () => {
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
      <Login />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/patient manager/i);
  expect(titleElement).toBeInTheDocument();
});
