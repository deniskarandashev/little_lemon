import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm, { validateBooking } from "../BookingForm.jsx";

// Unit tests for the pure validation logic (edge cases).
describe("validateBooking", () => {
  const validFuture = {
    date: "2999-01-01",
    time: "18:00",
    guests: "4",
    occasion: "Birthday",
  };

  it("returns no errors for valid input", () => {
    expect(validateBooking(validFuture)).toEqual({});
  });

  it("rejects an empty form with a message per field", () => {
    const errors = validateBooking({
      date: "",
      time: "",
      guests: "",
      occasion: "",
    });
    expect(errors.date).toBeDefined();
    expect(errors.time).toBeDefined();
    expect(errors.guests).toBeDefined();
    expect(errors.occasion).toBeDefined();
  });

  it("rejects a date in the past", () => {
    expect(
      validateBooking({ ...validFuture, date: "2000-01-01" }).date
    ).toMatch(/past/i);
  });

  it("rejects guest counts outside the 1-10 range", () => {
    expect(validateBooking({ ...validFuture, guests: "0" }).guests).toBeDefined();
    expect(validateBooking({ ...validFuture, guests: "11" }).guests).toBeDefined();
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
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
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
    await userEvent.click(
      screen.getByRole("button", { name: /confirm reservation/i })
    );
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    expect(submitForm).not.toHaveBeenCalled();
  });

  it("submits valid data", async () => {
    const { submitForm } = setup();
    await userEvent.type(screen.getByLabelText(/choose date/i), "2999-01-01");
    await userEvent.selectOptions(screen.getByLabelText(/choose time/i), "18:00");
    await userEvent.type(screen.getByLabelText(/number of guests/i), "4");
    await userEvent.selectOptions(screen.getByLabelText(/occasion/i), "Birthday");
    await userEvent.click(
      screen.getByRole("button", { name: /confirm reservation/i })
    );
    expect(submitForm).toHaveBeenCalledOnce();
  });
});
