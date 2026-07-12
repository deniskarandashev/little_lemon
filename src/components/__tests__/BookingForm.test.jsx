import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm, { validateBooking, TABLES } from "../BookingForm.jsx";

// A valid future booking used across the validation tests.
const validBooking = {
  date: "2999-01-01",
  time: "18:00",
  name: "Silvia Johnson",
  phone: "+1-234-567-890",
  table: "2",
};

// Unit tests for the pure validation logic (edge cases).
describe("validateBooking", () => {
  it("returns no errors for valid input", () => {
    expect(validateBooking(validBooking)).toEqual({});
  });

  it("rejects an empty form with a message per field", () => {
    const errors = validateBooking({
      date: "",
      time: "",
      name: "",
      phone: "",
      table: "",
    });
    expect(errors.date).toBeDefined();
    expect(errors.time).toBeDefined();
    expect(errors.name).toBeDefined();
    expect(errors.phone).toBeDefined();
    expect(errors.table).toBeDefined();
  });

  it("rejects a date in the past", () => {
    expect(
      validateBooking({ ...validBooking, date: "2000-01-01" }).date
    ).toMatch(/past/i);
  });

  it("rejects a phone number with too few digits", () => {
    expect(validateBooking({ ...validBooking, phone: "123" }).phone).toBeDefined();
  });

  it("rejects a blank name", () => {
    expect(validateBooking({ ...validBooking, name: "   " }).name).toBeDefined();
  });
});

// Rendering / interaction tests for the form component.
describe("BookingForm", () => {
  const setup = () => {
    const submitForm = vi.fn();
    const dispatch = vi.fn();
    render(
      <BookingForm
        availableTimes={["17:00", "18:00"]}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    );
    return { submitForm, dispatch };
  };

  it("renders all form fields", () => {
    setup();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: /select a table/i })
    ).toBeInTheDocument();
  });

  it("disables tables that are already booked", () => {
    setup();
    const bookedCount = TABLES.filter((t) => t.booked).length;
    const disabled = screen.getAllByRole("radio").filter((r) => r.disabled);
    expect(disabled.length).toBe(bookedCount);
  });

  it("dispatches UPDATE_TIMES when the date changes", async () => {
    const { dispatch } = setup();
    await userEvent.type(screen.getByLabelText(/choose date/i), "2999-01-01");
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "UPDATE_TIMES" })
    );
  });

  it("shows validation errors when submitting an empty form", async () => {
    const { submitForm } = setup();
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    expect(submitForm).not.toHaveBeenCalled();
  });

  it("submits valid data", async () => {
    const { submitForm } = setup();
    await userEvent.type(screen.getByLabelText(/choose date/i), "2999-01-01");
    await userEvent.selectOptions(screen.getByLabelText(/select time/i), "18:00");
    await userEvent.type(screen.getByLabelText(/^name$/i), "Silvia Johnson");
    await userEvent.type(
      screen.getByLabelText(/phone number/i),
      "+1-234-567-890"
    );
    await userEvent.click(screen.getByRole("radio", { name: /table 2/i }));
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(submitForm).toHaveBeenCalledOnce();
  });
});
