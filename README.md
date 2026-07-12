# Little Lemon – table booking

Front-end capstone for the Meta Front-End Developer certificate. It's a small
React site for the Little Lemon restaurant with an online table reservation
page.

## The problem

Little Lemon is a family-owned Mediterranean restaurant in Chicago. Right now it
has no way to book a table online – guests can only call or walk in, which means
missed bookings and no record of reservations. This project adds an online
reservation page so guests can pick a date, see the times that are free that
day, leave their details and book a table in a few seconds.

## Design

The look follows the Little Lemon style guide (Markazi Text for headings, Karla
for text, and the green/yellow brand colours). The design work (persona, journey
map, wireframe and prototype) lives in Figma – the exported file is in
[`design/LittleLemon-canvas.fig`](./design/LittleLemon-canvas.fig).

- Prototype – https://www.figma.com/file/tH9wPLP9yH5Q9E59mFA5Mv/canvas?node-id=0%3A1
- Persona – https://www.figma.com/file/tH9wPLP9yH5Q9E59mFA5Mv/canvas?node-id=305%3A82
- Journey map – https://www.figma.com/file/tH9wPLP9yH5Q9E59mFA5Mv/canvas?node-id=313%3A102
- Wireframe – https://www.figma.com/file/tH9wPLP9yH5Q9E59mFA5Mv/canvas?node-id=319%3A59

## What it does

- [x] Home, reservations and confirmation pages (React Router).
- [x] Home page with a hero, the week's specials, a few reviews and an about
  section.
- [x] Booking form with date, time, name, phone and a table picker (tables 1 and 6
  are already booked). Available times come from the `fetchAPI` helper and
  refresh when you change the date, using `useReducer`.
- [x] Form validation with error messages (past dates, short phone numbers, missing
  name, no table chosen).
- [x] Submitting calls `submitAPI` and shows a confirmation page.
- [x] Labels, `aria-invalid`/`aria-describedby` and `role="alert"` for
  accessibilty, plus a responsive layout.

Dish photos are from [TheMealDB](https://www.themealdb.com/) (free to use).

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm test
```

## Structure

```
src/
  api.js                fetchAPI / submitAPI
  App.jsx               routes
  components/           Header, Footer, Hero, Specials, Testimonials, About, BookingForm
  pages/                HomePage, BookingPage, ConfirmedBooking
  index.css
```
