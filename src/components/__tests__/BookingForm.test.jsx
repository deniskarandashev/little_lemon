import { describe, it, expect } from "vitest";
import { validateBooking, AVAILABLE_TIMES } from "../BookingForm.jsx";

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
    const errors = validateBooking({ ...validFuture, date: "2000-01-01" });
    expect(errors.date).toMatch(/past/i);
  });

  it("rejects guest counts outside the 1-10 range", () => {
    expect(validateBooking({ ...validFuture, guests: "0" }).guests).toBeDefined();
    expect(validateBooking({ ...validFuture, guests: "11" }).guests).toBeDefined();
  });

  it("exposes the expected time slots", () => {
    expect(AVAILABLE_TIMES).toContain("18:00");
    expect(AVAILABLE_TIMES.length).toBeGreaterThan(0);
  });
});
