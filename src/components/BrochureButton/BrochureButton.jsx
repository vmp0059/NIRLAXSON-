import { useEffect, useState } from "react";
import "./BrochureButton.css";

function BrochureButton() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimer;

    const handleScroll = () => {
      // Hide brochure while the user is actively scrolling
      setIsScrolling(true);

      // Clear the previous timer
      clearTimeout(scrollTimer);

      // Show brochure again after scrolling stops
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 700);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <a
      href="/brochure.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={`brochure-tab ${
        isScrolling ? "brochure-hidden" : ""
      }`}
      aria-label="View Nirlaxson Industries brochure"
    >
      {/* Download / PDF Icon */}
      <span className="brochure-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Arrow */}
          <path
            d="M12 3V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Arrow head */}
          <path
            d="M7.5 10.5L12 15L16.5 10.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Bottom line */}
          <path
            d="M5 20H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {/* Vertical Text */}
      <span className="brochure-text">
        <span className="brochure-small">
          VIEW
        </span>

        <span className="brochure-main">
          BROCHURE
        </span>
      </span>
    </a>
  );
}

export default BrochureButton;