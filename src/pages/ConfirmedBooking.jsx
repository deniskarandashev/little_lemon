import { Link, useLocation } from "react-router-dom";

function ConfirmedBooking() {
  const { state: booking } = useLocation();

  return (
    <section className="confirmation" role="status" aria-live="polite">
      <h1>Booking confirmed!</h1>
      {booking ? (
        <p>
          Thank you, {booking.name}! Table {booking.table} is reserved on{" "}
          {booking.date} at {booking.time}. A confirmation will be sent to{" "}
          {booking.phone}.
        </p>
      ) : (
        <p>Your reservation has been confirmed.</p>
      )}
      <Link to="/">Back to home</Link>
    </section>
  );
}

export default ConfirmedBooking;
