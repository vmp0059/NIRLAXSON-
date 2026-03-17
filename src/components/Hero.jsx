import heroImage from "../assets/heroImage.jpeg";
import "./Hero.css";

function Hero() {
  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <h4>Founded in 2015</h4>
        <h1>Nirlaxson Industries</h1>
        <p>
          Delivering industrial innovation and machinery solutions for
          modern manufacturing needs.
        </p>
      </div>
    </div>
  );
}

export default Hero;