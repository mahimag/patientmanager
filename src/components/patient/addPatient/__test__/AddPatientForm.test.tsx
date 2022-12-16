import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddPatientForm from "../AddPatientForm";

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
      <AddPatientForm />
    </BrowserRouter>
  );
});

describe("Add Patient Form", () => {
  it("should render first name", () => {
    const labelElement = screen.getByLabelText(/first name/i);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render last name", () => {
    const labelElement = screen.getByLabelText(/last name/i);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render email", () => {
    const labelElement = screen.getByLabelText(/email/i);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render address", () => {
    const labelElement = screen.getByLabelText(/address/i);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render phone number", () => {
    const labelElement = screen.getByLabelText(/phone number/i);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render date of birth", () => {
    const labelElement = screen.getByLabelText(/date of birth/i);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render fav", () => {
    const textElement = screen.getByText(/fav/i);

    expect(textElement).toBeInTheDocument();
  });

  it("should render upload button", () => {
    const buttonElement = screen.getByText(/click to upload/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEnabled();
  });

  it("should render submit button", () => {
    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEnabled();
  });
});
