import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
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
        <img
          className="hero-image"
          src="/images/hero.jpg"
          alt="Signature Mediterranean dish at Little Lemon"
        />
      </div>
    </section>
  );
}

export default Hero;
