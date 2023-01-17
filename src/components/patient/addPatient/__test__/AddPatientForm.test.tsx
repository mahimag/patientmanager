import axios from "axios";
import { act } from "react-dom/test-utils";
import AddPatientForm from "../AddPatientForm";
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

describe("Add Patient Form", () => {
  it("should render first name", () => {
    render(
      <BrowserRouter>
        <AddPatientForm />
      </BrowserRouter>
    );
    const labelElement = screen.getByLabelText(/first name/i);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render last name", () => {
    render(
      <BrowserRouter>
        <AddPatientForm />
      </BrowserRouter>
    );
    const labelElement = screen.getByLabelText(/last name/i);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render email", () => {
    render(
      <BrowserRouter>
        <AddPatientForm />
      </BrowserRouter>
    );
    const labelElement = screen.getByLabelText(/email/i);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render address", () => {
    render(
      <BrowserRouter>
        <AddPatientForm />
      </BrowserRouter>
    );
    const labelElement = screen.getByLabelText(/address/i);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render phone number", () => {
    render(
      <BrowserRouter>
        <AddPatientForm />
      </BrowserRouter>
    );
    const labelElement = screen.getByLabelText(/phone number/i);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render date of birth", () => {
    render(
      <BrowserRouter>
        <AddPatientForm />
      </BrowserRouter>
    );
    const labelElement = screen.getByLabelText(/date of birth/i);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render fav", () => {
    render(
      <BrowserRouter>
        <AddPatientForm />
      </BrowserRouter>
    );
    const textElement = screen.getByText(/fav/i);

    expect(textElement).toBeInTheDocument();
  });

  it("should render upload button", () => {
    render(
      <BrowserRouter>
        <AddPatientForm />
      </BrowserRouter>
    );
    const buttonElement = screen.getByText(/click to upload/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEnabled();
  });

  it("should render submit button", () => {
    render(
      <BrowserRouter>
        <AddPatientForm />
      </BrowserRouter>
    );
    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEnabled();
  });

  it("submits the add patient form", async () => {
    render(
      <BrowserRouter>
        <AddPatientForm />
      </BrowserRouter>
    );

    global.URL.createObjectURL = jest.fn();

    const firstName = screen.getByTestId("input-first-name");
    const lastName = screen.getByTestId("input-last-name");
    const email = screen.getByTestId("input-email");
    const number = screen.getByTestId("input-phone");
    const dob = screen.getByTestId("input-dob");
    const address = screen.getByTestId("input-address");
    const checkbox = screen.getByTestId("input-checkbox");
    const upload = screen.getByTestId("upload-input");

    const buttonElement = screen.getByTestId("add-patient-btn");
    expect(buttonElement).toBeInTheDocument();

    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        data: {
          accessToken: "accessToken",
          id: "1",
        },
      },
    });

    let resp;

    const file = new File(["(binary)"], "test.jpg", { type: "image/jpeg" });

    await act(async () => {
      fireEvent.change(firstName, { target: { value: "John" } });
      fireEvent.change(lastName, { target: { value: "Doe" } });
      fireEvent.change(email, { target: { value: "test@example.com" } });
      fireEvent.change(number, { target: { value: "1234567890" } });
      fireEvent.change(dob, { target: { value: "01/01/2000" } });
      fireEvent.change(checkbox, { target: { value: true } });
      fireEvent.change(address, { target: { value: "123 Main St" } });
      fireEvent.change(upload, { target: { files: [file] } });

      resp = await fireEvent.click(buttonElement);
    });

    expect(axios.post).toHaveBeenCalled();
    expect(resp).toEqual(true);
  });

  it("should show error while submitting the add patient form", async () => {
    render(
      <BrowserRouter>
        <AddPatientForm />
      </BrowserRouter>
    );

    global.URL.createObjectURL = jest.fn();

    const firstName = screen.getByTestId("input-first-name");
    const lastName = screen.getByTestId("input-last-name");
    const email = screen.getByTestId("input-email");
    const number = screen.getByTestId("input-phone");
    const dob = screen.getByTestId("input-dob");
    const address = screen.getByTestId("input-address");
    const checkbox = screen.getByTestId("input-checkbox");
    const upload = screen.getByTestId("upload-input");

    const buttonElement = screen.getByTestId("add-patient-btn");
    expect(buttonElement).toBeInTheDocument();

    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        data: {
          accessToken: "accessToken",
          id: "1",
        },
      },
    });

    let resp;
    
    const file = new File(["(binary)"], "test.jpg", { type: "image/jpeg" });

    await act(async () => {
      fireEvent.change(firstName, { target: { value: "John" } });
      fireEvent.change(lastName, { target: { value: "Doe" } });
      fireEvent.change(email, { target: { value: "test@example.com" } });
      fireEvent.change(number, { target: { value: "1234567890" } });
      fireEvent.change(dob, { target: { value: "01/01/2000" } });
      fireEvent.change(checkbox, { target: { value: true } });
      fireEvent.change(address, { target: { value: "123 Main St" } });
      fireEvent.change(upload, { target: { files: [file] } });

      resp = await fireEvent.click(buttonElement);
    });

    expect(axios.post).toHaveBeenCalled();
    expect(resp).toEqual(true);
  });
});
