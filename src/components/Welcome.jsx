// src/components/Welcome.jsx
import React from "react";
import "./Welcome.css"; // optional, for styling
import SideImage from "../assets/SideImage.jpeg";

const Welcome = () => {
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

          <button>Read More</button>
        </div>

      </div>

    </section>
  );
};

export default Welcome;