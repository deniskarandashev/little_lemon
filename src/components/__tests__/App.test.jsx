import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App.jsx";

// Integration test: submitting a valid form shows a confirmation.
describe("Booking flow", () => {
  it("shows validation errors when submitting an empty form", async () => {
    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: /confirm reservation/i }));
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
  });

  it("confirms the booking for valid input", async () => {
    render(<App />);
    await userEvent.type(screen.getByLabelText(/choose date/i), "2999-01-01");
    await userEvent.selectOptions(screen.getByLabelText(/choose time/i), "18:00");
    await userEvent.type(screen.getByLabelText(/number of guests/i), "4");
    await userEvent.selectOptions(screen.getByLabelText(/occasion/i), "Birthday");
    await userEvent.click(screen.getByRole("button", { name: /confirm reservation/i }));

    expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument();
  });
});
