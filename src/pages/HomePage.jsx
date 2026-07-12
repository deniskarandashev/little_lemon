import Hero from "../components/Hero.jsx";
import Specials from "../components/Specials.jsx";
import Testimonials from "../components/Testimonials.jsx";
import About from "../components/About.jsx";

// Landing page composed of the marketing sections.
function HomePage() {
  return (
    <>
      <Hero />
      <Specials />
      <Testimonials />
      <About />
    </>
  );
}

export default HomePage;
