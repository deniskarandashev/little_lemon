const REVIEWS = [
  { name: "Sarah", rating: "★★★★★", text: "Amazing food and cosy atmosphere!" },
  { name: "Mike", rating: "★★★★★", text: "The lemon dessert is unforgettable." },
  { name: "Elena", rating: "★★★★☆", text: "Great service, will come again." },
  { name: "Tom", rating: "★★★★★", text: "Best Mediterranean food in Chicago." },
];

function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading">What our customers say</h2>
      <ul className="card-grid">
        {REVIEWS.map((review) => (
          <li key={review.name} className="card">
            <p className="rating" aria-label={`${review.rating} rating`}>
              {review.rating}
            </p>
            <p className="reviewer">{review.name}</p>
            <p>{review.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Testimonials;
