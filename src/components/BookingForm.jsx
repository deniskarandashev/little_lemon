import { useState } from "react";

// Today's date (YYYY-MM-DD) used to block reservations in the past.
const today = () => new Date().toISOString().split("T")[0];

// Pure validation so it can be unit-tested in isolation.
// Returns an object with a message per invalid field (empty = valid).
export function validateBooking({ date, time, guests, occasion }) {
  const errors = {};

  if (!date) {
    errors.date = "Please choose a date.";
  } else if (date < today()) {
    errors.date = "The date cannot be in the past.";
  }

  if (!time) {
    errors.time = "Please choose a time.";
  }

  const guestCount = Number(guests);
  if (!guests) {
    errors.guests = "Please enter the number of guests.";
  } else if (Number.isNaN(guestCount) || guestCount < 1 || guestCount > 10) {
    errors.guests = "Guests must be between 1 and 10.";
  }

  if (!occasion) {
    errors.occasion = "Please select an occasion.";
  }

  return errors;
}

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [form, setForm] = useState({
    date: "",
    time: "",
    guests: "",
    occasion: "",
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

  // Helper: props linking an input to its error message for screen readers.
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
        <label htmlFor="time">Choose time</label>
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
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={form.guests}
          onChange={handleChange}
          required
          {...errorProps("guests")}
        />
        {errors.guests && (
          <span id="guests-error" className="error" role="alert">
            {errors.guests}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={form.occasion}
          onChange={handleChange}
          required
          {...errorProps("occasion")}
        >
          <option value="">Select an occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Other">Other</option>
        </select>
        {errors.occasion && (
          <span id="occasion-error" className="error" role="alert">
            {errors.occasion}
          </span>
        )}
      </div>

      <button type="submit" aria-label="On Click confirm reservation">
        Reserve
      </button>
    </form>
  );
}

export default BookingForm;
