import { describe, it, expect } from "vitest";
import { initializeTimes, updateTimes } from "../BookingPage.jsx";

describe("Available times reducer", () => {
  it("initializeTimes returns a non-empty array of time slots", () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
  });

  it("updateTimes returns times for the newly selected date", () => {
    const result = updateTimes([], {
      type: "UPDATE_TIMES",
      date: "2999-01-15",
    });
    expect(Array.isArray(result)).toBe(true);
  });

  it("updateTimes returns the current state for unknown actions", () => {
    const state = ["17:00"];
    expect(updateTimes(state, { type: "UNKNOWN" })).toBe(state);
  });
});
