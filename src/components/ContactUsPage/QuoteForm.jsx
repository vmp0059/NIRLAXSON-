import { Field, ErrorMsg } from "./FormField";
import "./QuoteForm.css";

const PRODUCTS_LIST = [
  // Replace with: import { products as productsData } from "../assets/products/data";
  // and map: productsData.map((p) => p.name)
  // Listed here as fallback placeholders:
  "Bead Mill",
  "Basket Mill",
  "Disperser",
  "Planetary Mixer",
  "Triple Roll Mill",
  "Sand Mill",
];

const MATERIALS = ["SS304", "SS316", "Mild Steel", "Other"];

const INDUSTRIES = [
  "Paint Industry",
  "Coating Industry",
  "Chemical Industry",
  "Adhesives",
  "Ink Manufacturing",
  "Food Processing",
  "Pharmaceutical",
  "Cosmetics",
  "Other",
];

const BUDGET_RANGES = [
  "Under ₹1 Lakh",
  "₹1–5 Lakh",
  "₹5–10 Lakh",
  "₹10–25 Lakh",
  "₹25–50 Lakh",
  "Above ₹50 Lakh",
  "Need Consultation",
];

/**
 * QuoteForm renders the "Request a Quote" specific fields.
 *
 * Props:
 *  - quoteForm   : object  – quote form state
 *  - onChange    : fn      – handles quoteForm field changes
 *  - errors      : object  – validation errors for quote fields
 *  - onProductToggle : fn  – toggles a product in selectedProducts array
 */
export default function QuoteForm({
  quoteForm,
  onChange,
  errors,
  onProductToggle,
}) {
  return (
    <div className="quote-section">
      <div className="quote-section-header">
        <h3>Machinery Specifications</h3>
      </div>

      {/* Product Selection */}
      <div className="quote-products-section">
        <label>Select Product(s)</label>
        <div className="quote-products-grid">
          {PRODUCTS_LIST.map((product) => (
            <label key={product} className="quote-product-option">
              <input
                type="checkbox"
                checked={quoteForm.selectedProducts.includes(product)}
                onChange={() => onProductToggle(product)}
              />
              <span>{product}</span>
            </label>
          ))}
        </div>
        <small>Select relevant products. Leave blank if unsure.</small>
      </div>

      {/* Capacity */}
      <Field
        label="Required Capacity *"
        name="capacity"
        placeholder="e.g. 100 Litres, 500 KG, 2 Ton/Hour"
        value={quoteForm.capacity}
        error={errors.capacity}
        onChange={onChange}
      />

      {/* Material */}
      <div className="form-field">
        <label htmlFor="material">Material</label>
        <select
          id="material"
          name="material"
          value={quoteForm.material}
          onChange={onChange}
        >
          <option value="">Select material...</option>
          {MATERIALS.map((mat) => (
            <option key={mat} value={mat}>
              {mat}
            </option>
          ))}
        </select>
      </div>

      {quoteForm.material === "Other" && (
        <Field
          label="Custom Material Specification"
          name="customMaterial"
          placeholder="e.g. Carbon Steel, Stainless Steel Grade..."
          value={quoteForm.customMaterial}
          onChange={onChange}
        />
      )}

      {/* Industry */}
      <div className="form-field">
        <label htmlFor="industry">Industry Type *</label>
        <select
          id="industry"
          name="industry"
          value={quoteForm.industry}
          onChange={onChange}
          className={errors.industry ? "form-field-input--error" : ""}
        >
          <option value="">Select industry...</option>
          {INDUSTRIES.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
        {errors.industry && <ErrorMsg msg={errors.industry} />}
      </div>

      {quoteForm.industry === "Other" && (
        <Field
          label="Specify Industry"
          name="customIndustry"
          placeholder="e.g. Automotive, Textile, etc."
          value={quoteForm.customIndustry}
          onChange={onChange}
        />
      )}

      {/* Quantity */}
      <Field
        label="Quantity Required"
        name="quantity"
        type="number"
        placeholder="e.g. 1, 2, 5"
        value={quoteForm.quantity}
        onChange={onChange}
      />

      {/* Delivery Date */}
      <Field
        label="Expected Delivery Date"
        name="deliveryDate"
        type="date"
        value={quoteForm.deliveryDate}
        onChange={onChange}
      />

      {/* Location */}
      <Field
        label="Installation Location *"
        name="location"
        placeholder="e.g. Mumbai, Ahmedabad, Dubai, Indonesia"
        value={quoteForm.location}
        error={errors.location}
        onChange={onChange}
      />

      {/* Budget Range */}
      <div className="form-field">
        <label htmlFor="budgetRange">Budget Range</label>
        <select
          id="budgetRange"
          name="budgetRange"
          value={quoteForm.budgetRange}
          onChange={onChange}
        >
          <option value="">Select budget range...</option>
          {BUDGET_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      {/* Additional Requirements */}
      <div className="form-field">
        <label htmlFor="additionalRequirements">Additional Requirements</label>
        <textarea
          id="additionalRequirements"
          name="additionalRequirements"
          placeholder="Share process details, viscosity requirements, automation needs, custom dimensions, or any technical specifications."
          value={quoteForm.additionalRequirements}
          onChange={onChange}
        />
      </div>
    </div>
  );
}