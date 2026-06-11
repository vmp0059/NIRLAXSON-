import "./QuoteSummary.css";

/**
 * QuoteSummary renders a review card before final quote submission.
 *
 * Props:
 *  - form        : object – base contact form state (name, email)
 *  - quoteForm   : object – quote-specific form state
 *  - onConfirm   : fn     – called when user confirms submission
 *  - onEdit      : fn     – called to go back and edit
 */
export default function QuoteSummary({ form, quoteForm, onConfirm, onEdit }) {
  const getDisplayValue = (value) =>
    value && value.trim() ? value : "—";

  const displayProducts =
    quoteForm.selectedProducts.length > 0
      ? quoteForm.selectedProducts.join(", ")
      : "All products";

  const displayMaterial =
    quoteForm.material === "Other"
      ? `Other: ${quoteForm.customMaterial || "Not specified"}`
      : getDisplayValue(quoteForm.material);

  const displayIndustry =
    quoteForm.industry === "Other"
      ? `Other: ${quoteForm.customIndustry || "Not specified"}`
      : getDisplayValue(quoteForm.industry);

  const displayDate = quoteForm.deliveryDate
    ? new Date(quoteForm.deliveryDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="quote-summary-container">
      <div className="quote-summary-card">
        <h3 className="quote-summary-title">Quote Summary</h3>
        <p className="quote-summary-subtitle">
          Please review your quotation details before submitting.
        </p>

        <div className="quote-summary-grid">
          <SummaryItem label="Selected Products" value={displayProducts} />
          <SummaryItem
            label="Required Capacity"
            value={getDisplayValue(quoteForm.capacity)}
          />
          <SummaryItem label="Material" value={displayMaterial} />
          <SummaryItem label="Industry Type" value={displayIndustry} />
          <SummaryItem
            label="Quantity Required"
            value={
              getDisplayValue(quoteForm.quantity) === "—"
                ? "—"
                : `${quoteForm.quantity} Machine(s)`
            }
          />
          <SummaryItem label="Expected Delivery" value={displayDate} />
          <SummaryItem
            label="Installation Location"
            value={getDisplayValue(quoteForm.location)}
          />
          <SummaryItem
            label="Budget Range"
            value={getDisplayValue(quoteForm.budgetRange)}
          />
        </div>

        {quoteForm.additionalRequirements && (
          <div className="summary-full-width">
            <div className="summary-label">Additional Requirements</div>
            <div className="summary-value-long">
              {quoteForm.additionalRequirements}
            </div>
          </div>
        )}

        <div className="summary-actions">
          <button
            type="button"
            className="summary-btn summary-btn-secondary"
            onClick={onEdit}
          >
            Edit Details
          </button>
          <button
            type="button"
            className="summary-btn summary-btn-primary"
            onClick={onConfirm}
          >
            Confirm & Submit Quote
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="summary-item">
      <div className="summary-label">{label}</div>
      <div className="summary-value">{value}</div>
    </div>
  );
}