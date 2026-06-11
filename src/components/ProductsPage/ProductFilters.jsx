import "./ProductFilters.css";

export default function ProductFilters({
  categories,
  activeFilter,
  setActiveFilter,
}) {
  return (
    <div className="products-filter-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`products-filter-btn ${
            activeFilter === cat ? "active" : ""
          }`}
          onClick={() => setActiveFilter(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}