// src/components/StatsBar.jsx
import "./StatsBar.css";

const stats = [
  { number: "2015", label: "Year Founded" },
  { number: "10+", label: "Years Experience" },
  { number: "500+", label: "Products Delivered" },
  { number: "15+", label: "Team Members" },
  { number: "01", label: "Production Line" },
];

function StatsBar() {
  return (
    <div className="statsbar">
      {stats.map((s, i) => (
        <div className="statsbar-item" key={i}>
          <span className="statsbar-number">{s.number}</span>
          <span className="statsbar-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;