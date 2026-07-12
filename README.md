# Little Lemon — Front-End Developer Capstone

Capstone project for the **Meta Front-End Developer** professional certificate.
A React web app for the Little Lemon restaurant with an online table-booking
system.

## Features

- **Multi-page site** (React Router): Home, Reservations, Confirmation.
- **Home page** with Hero + call-to-action, weekly Specials, Testimonials and
  About sections.
- **Booking system** using the Meta-provided `fetchAPI` / `submitAPI`:
  - Available times are managed with `useReducer`
    (`initializeTimes` / `updateTimes`) and **update dynamically when the date
    changes**.
  - **Client-side validation** with meaningful error messages and edge cases
    (past dates, guest count outside 1–10, required fields).
  - Successful submission calls `submitAPI` and routes to a confirmation page.
- **Accessible**: semantic landmarks (`header`/`main`/`footer`/`nav`),
  associated `label`s, `aria-invalid`, `aria-describedby`, `role="alert"`.
- **Responsive**, mobile-first layout (CSS Grid).
- **Tests** (Vitest + React Testing Library): validation logic, the times
  reducer, and form rendering/interaction.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build
npm test         # run the test suite
```

## Project structure

```
src/
  api.js                      # Meta-provided fetchAPI / submitAPI
  App.jsx                     # app shell + routes
  main.jsx                    # entry point (BrowserRouter)
  index.css                   # responsive styles
  components/
    Header.jsx  Footer.jsx
    Hero.jsx  Specials.jsx  Testimonials.jsx  About.jsx
    BookingForm.jsx           # form UI + validateBooking()
    __tests__/
  pages/
    HomePage.jsx
    BookingPage.jsx           # useReducer: initializeTimes / updateTimes
    ConfirmedBooking.jsx
    __tests__/
```

## License

For educational use as part of the Meta Front-End Developer Capstone.
