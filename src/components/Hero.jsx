import { useNavigate } from "react-router-dom";

// Landing hero with the primary "Reserve a table" call to action.
function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are a family-owned Mediterranean restaurant, focused on
          traditional recipes served with a modern twist.
        </p>
        <button type="button" onClick={() => navigate("/booking")}>
          Reserve a table
        </button>
      </div>
    </section>
  );
}

export default Hero;
