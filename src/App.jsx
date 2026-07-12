import { useState } from "react";
import BookingForm from "./components/BookingForm.jsx";
import ConfirmedBooking from "./components/ConfirmedBooking.jsx";

function App() {
  const [confirmed, setConfirmed] = useState(null);

  const submitBooking = (formData) => {
    setConfirmed(formData);
    return true;
  };

  return (
    <div className="app">
      <header className="header">
        <nav aria-label="Main navigation">
          <a className="logo" href="/">
            Little Lemon
          </a>
        </nav>
      </header>

      <main className="main">
        <h1>Reserve a Table</h1>
        {confirmed ? (
          <ConfirmedBooking booking={confirmed} />
        ) : (
          <BookingForm submitForm={submitBooking} />
        )}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Little Lemon, Chicago.</p>
      </footer>
    </div>
  );
}

export default App;
