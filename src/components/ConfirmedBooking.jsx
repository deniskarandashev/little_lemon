// Simple confirmation shown after a successful booking submission.
function ConfirmedBooking({ booking }) {
  return (
    <section className="confirmation" role="status" aria-live="polite">
      <h2>Booking confirmed!</h2>
      <p>
        Your table for {booking.guests} guest(s) is reserved on {booking.date}{" "}
        at {booking.time} ({booking.occasion}).
      </p>
    </section>
  );
}

export default ConfirmedBooking;
