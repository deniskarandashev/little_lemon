# Little Lemon — Front-End Developer Capstone

Capstone project for the **Meta Front-End Developer** professional certificate.
A React web app for the Little Lemon restaurant with an online table-booking
system.

## Problem statement

Little Lemon is a family-owned Mediterranean restaurant in Chicago. The
business is popular but **currently has no online table reservation element** —
guests can only book by phone or in person. This leads to missed bookings,
long hold times, double-bookings and no record of guest preferences.

This project solves that problem by adding an **online table-reservation
feature** to the Little Lemon website: guests can pick a date, see the
available times for that date, choose the number of guests and the occasion,
and confirm a reservation in a few seconds.

## UX / UI design

The interface follows the official Little Lemon design system (Markazi Text +
Karla typography and the brand colour palette). It is driven by the persona
**Silvia Johnson** (40, journalist) and her user journey — visiting the site,
choosing a date and time, entering her details and confirming a table. The
design deliverables are maintained in Figma (source file also included under
[`/design/LittleLemon-canvas.fig`](./design/LittleLemon-canvas.fig)):

- **Prototype** — https://www.figma.com/file/tH9wPLP9yH5Q9E59mFA5Mv/canvas?node-id=0%3A1
- **Persona** — https://www.figma.com/file/tH9wPLP9yH5Q9E59mFA5Mv/canvas?node-id=305%3A82
- **Journey map** — https://www.figma.com/file/tH9wPLP9yH5Q9E59mFA5Mv/canvas?node-id=313%3A102
- **Wireframe** — https://www.figma.com/file/tH9wPLP9yH5Q9E59mFA5Mv/canvas?node-id=319%3A59

## Features

- **Multi-page site** (React Router): Home, Reservations, Confirmation.
- **Home page** with Hero + call-to-action, weekly Specials, Testimonials and
  About sections.
- **Booking system** using the Meta-provided `fetchAPI` / `submitAPI`, matching
  the Figma reservation design (date, time, name, phone and table selection):
  - Available times are managed with `useReducer`
    (`initializeTimes` / `updateTimes`) and **update dynamically when the date
    changes**.
  - **Table picker** with already-booked tables disabled (Tables 1 and 6).
  - **Client-side validation** with meaningful error messages and edge cases
    (past dates, invalid phone number, empty name, no table selected).
  - Successful submission calls `submitAPI` and routes to a confirmation page.
- **Accessible**: semantic landmarks (`header`/`main`/`footer`/`nav`),
  associated `label`s, `aria-invalid`, `aria-describedby`, `role="alert"`.
- **Responsive**, mobile-first layout (CSS Grid).
- **Images**: real dish photography (hero, menu specials, about) plus a
  lightweight SVG logo, all rendered as `<img>` with `alt` text. Photos are
  sourced from [TheMealDB](https://www.themealdb.com/) (free to use).
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
