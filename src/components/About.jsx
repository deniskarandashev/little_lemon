// "About" section describing the restaurant owners.
function About() {
  return (
    <section className="about" aria-labelledby="about-heading">
      <div className="about-text">
        <h2 id="about-heading">About Little Lemon</h2>
        <p>
          Little Lemon was founded by two Italian brothers, Mario and Adrian,
          who moved to the United States to pursue their shared dream of owning
          a restaurant.
        </p>
        <p>
          Based in Chicago, Little Lemon serves a fusion of Mediterranean
          recipes featuring the freshest seasonal ingredients.
        </p>
      </div>
      <img
        className="about-image"
        src="/images/about.jpg"
        alt="Freshly prepared Mediterranean dishes at Little Lemon"
      />
    </section>
  );
}

export default About;
