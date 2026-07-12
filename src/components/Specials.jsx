// This week's featured dishes.
const SPECIALS = [
  {
    name: "Greek Salad",
    price: "$12.99",
    image: "/images/greek-salad.jpg",
    description:
      "The famous Greek salad of crispy lettuce, peppers, olives and Chicago cheese.",
  },
  {
    name: "Bruschetta",
    price: "$5.99",
    image: "/images/bruschetta.jpg",
    description:
      "Grilled bread smeared with garlic and topped with olive oil and salt.",
  },
  {
    name: "Lemon Dessert",
    price: "$5.00",
    image: "/images/lemon-dessert.jpg",
    description:
      "This comes straight from grandma's recipe book, every last ingredient.",
  },
];

function Specials() {
  return (
    <section className="specials" id="specials" aria-labelledby="specials-heading">
      <h2 id="specials-heading">This week's specials</h2>
      <ul className="card-grid">
        {SPECIALS.map((dish) => (
          <li key={dish.name} className="card">
            <img className="card-image" src={dish.image} alt={dish.name} />
            <h3>{dish.name}</h3>
            <p className="price">{dish.price}</p>
            <p>{dish.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Specials;
