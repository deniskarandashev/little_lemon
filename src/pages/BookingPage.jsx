import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm.jsx";
import { fetchAPI, submitAPI } from "../api.js";

// Lazy initial available times for today's date.
export function initializeTimes() {
  return fetchAPI(new Date());
}

// Reducer: recompute available times whenever the chosen date changes.
export function updateTimes(state, action) {
  switch (action.type) {
    case "UPDATE_TIMES":
      return fetchAPI(new Date(action.date));
    default:
      return state;
  }
}

// Booking page: owns the available-times state and the submit handler.
function BookingPage() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );
  const navigate = useNavigate();

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      navigate("/confirmed", { state: formData });
    }
  };

  return (
    <section className="booking" aria-labelledby="booking-heading">
      <h1 id="booking-heading">Reserve a Table</h1>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    </section>
  );
}

export default BookingPage;
