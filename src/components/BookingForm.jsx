import { useState } from "react";

// Tables available in the restaurant. Tables 1 and 6 are already booked,
// mirroring the Figma reservation design.
export const TABLES = [
  { id: 1, booked: true },
  { id: 2, booked: false },
  { id: 3, booked: false },
  { id: 4, booked: false },
  { id: 5, booked: false },
  { id: 6, booked: true },
];

// Today's date (YYYY-MM-DD) used to block reservations in the past.
const today = () => new Date().toISOString().split("T")[0];

// Pure validation so it can be unit-tested in isolation.
// Returns an object with a message per invalid field (empty = valid).
export function validateBooking({ date, time, name, phone, table }) {
  const errors = {};

  if (!date) {
    errors.date = "Please choose a date.";
  } else if (date < today()) {
    errors.date = "The date cannot be in the past.";
  }

  if (!time) {
    errors.time = "Please choose a time.";
  }

  if (!name || !name.trim()) {
    errors.name = "Please enter your name.";
  }

  const phoneDigits = (phone || "").replace(/\D/g, "");
  if (!phone) {
    errors.phone = "Please enter a phone number.";
  } else if (phoneDigits.length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!table) {
    errors.table = "Please select an available table.";
  }

  return errors;
}

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [form, setForm] = useState({
    date: "",
    time: "",
    name: "",
    phone: "",
    table: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Changing the date refreshes the available times via the reducer.
    if (name === "date") {
      dispatch({ type: "UPDATE_TIMES", date: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateBooking(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      submitForm(form);
    }
  };

  // Helper: props linking a control to its error message for screen readers.
  const errorProps = (field) =>
    errors[field]
      ? { "aria-invalid": true, "aria-describedby": `${field}-error` }
      : {};

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="date">Choose date</label>
        <input
          type="date"
          id="date"
          name="date"
          min={today()}
          value={form.date}
          onChange={handleChange}
          required
          {...errorProps("date")}
        />
        {errors.date && (
          <span id="date-error" className="error" role="alert">
            {errors.date}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="time">Select time</label>
        <select
          id="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          {...errorProps("time")}
        >
          <option value="">Select a time</option>
          {availableTimes.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        {errors.time && (
          <span id="time-error" className="error" role="alert">
            {errors.time}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          {...errorProps("name")}
        />
        {errors.name && (
          <span id="name-error" className="error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="phone">Phone number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          {...errorProps("phone")}
        />
        {errors.phone && (
          <span id="phone-error" className="error" role="alert">
            {errors.phone}
          </span>
        )}
      </div>

      <fieldset
        className="tables"
        aria-describedby={errors.table ? "table-error" : undefined}
      >
        <legend>Select a table to continue:</legend>
        <div className="table-grid">
          {TABLES.map((t) => (
            <label
              key={t.id}
              className={`table-option${t.booked ? " booked" : ""}`}
            >
              <input
                type="radio"
                name="table"
                value={String(t.id)}
                checked={form.table === String(t.id)}
                onChange={handleChange}
                disabled={t.booked}
              />
              <span>Table {t.id}</span>
              {t.booked && <span className="badge">BOOKED</span>}
            </label>
          ))}
        </div>
        {errors.table && (
          <span id="table-error" className="error" role="alert">
            {errors.table}
          </span>
        )}
      </fieldset>

      <button type="submit" aria-label="Submit reservation">
        Submit
      </button>
    </form>
  );
}

export default BookingForm;
