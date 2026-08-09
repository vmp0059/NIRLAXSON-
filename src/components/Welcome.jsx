// src/components/Welcome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css"; // optional, for styling
import SideImage from "../assets/products/SideImage.jpeg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <section className="welcome">

      {/* Title */}
      <div className="welcome-title">
        <h1>
          Manufacturer of Paint, Coating, Process, Chemical Plant Equipments
          & Machineries
        </h1>
      </div>

      {/* Image + Content */}
      <div className="welcome-container">

        <div className="welcome-image">
          <img src={SideImage} alt="machine" />
        </div>

        <div className="welcome-content">
          <p>
            At Nirlaxson Industries, we specialize in innovative solutions
            that drive growth and efficiency. Our expertise spans across
            cutting-edge technology, sustainable solutions, and tailored
            services for our clients worldwide.
          </p>

          {/* Legacy index.php's welcome section "Read More" links to
              about.php — matched here to /about. */}
          <button onClick={() => navigate("/about")}>Read More</button>
        </div>

      </div>

    </section>
  );
};

export default Welcome;