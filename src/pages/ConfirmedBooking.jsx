import { Link, useLocation } from "react-router-dom";

// Confirmation page shown after a successful submitAPI call.
function ConfirmedBooking() {
  const { state: booking } = useLocation();

  return (
    <section className="confirmation" role="status" aria-live="polite">
      <h1>Booking confirmed!</h1>
      {booking ? (
        <p>
          Your table for {booking.guests} guest(s) is reserved on {booking.date}{" "}
          at {booking.time} ({booking.occasion}).
        </p>
      ) : (
        <p>Your reservation has been confirmed.</p>
      )}
      <Link to="/">Back to home</Link>
    </section>
  );
}

export default ConfirmedBooking;
