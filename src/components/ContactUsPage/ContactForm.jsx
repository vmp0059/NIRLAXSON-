import { useState } from "react";
import { FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { Field, ErrorMsg } from "./FormField";
import QuoteForm from "./QuoteForm";
import QuoteSummary from "./QuoteSummary";
import "./ContactForm.css";

const INQUIRY_TYPES = [
  "Select inquiry type…",
  "Product Inquiry",
  "Request a Quote",
  "Technical Support",
  "Spare Parts & Service",
  "Partnership / Dealership",
  "General Question",
];

// Replace with: import { products as productsData } from "../../assets/products/data";
// and: productsData.map((p) => p.name)
const PRODUCTS = [
  "Bead Mill",
  "Basket Mill",
  "Disperser",
  "Planetary Mixer",
  "Triple Roll Mill",
  "Sand Mill",
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  inquiryType: "",
  selectedProducts: [],
  message: "",
};

const INITIAL_QUOTE = {
  selectedProducts: [],
  capacity: "",
  material: "",
  customMaterial: "",
  industry: "",
  customIndustry: "",
  quantity: "",
  deliveryDate: "",
  location: "",
  budgetRange: "",
  additionalRequirements: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [quoteForm, setQuoteForm] = useState(INITIAL_QUOTE);
  const [submitted, setSubmitted] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [showQuoteSummary, setShowQuoteSummary] = useState(false);
  const [errors, setErrors] = useState({});
  const [quoteErrors, setQuoteErrors] = useState({});

  const isQuoteInquiry = form.inquiryType === "Request a Quote";

  /* ── Validation ── */

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Please describe your inquiry";
    if (!form.inquiryType || form.inquiryType === INQUIRY_TYPES[0])
      e.inquiryType = "Please select a type";
    return e;
  };

  const validateQuote = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!quoteForm.capacity.trim()) e.capacity = "Required";
    if (!quoteForm.industry) e.industry = "Required";
    if (!quoteForm.location.trim()) e.location = "Required";
    if (!form.message.trim()) e.message = "Please describe your inquiry";
    return e;
  };

  /* ── Handlers ── */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm((prev) => ({ ...prev, [name]: value }));
    if (quoteErrors[name])
      setQuoteErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleProductToggle = (product) => {
    setForm((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(product)
        ? prev.selectedProducts.filter((p) => p !== product)
        : [...prev.selectedProducts, product],
    }));
  };

  const handleQuoteProductToggle = (product) => {
    setQuoteForm((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(product)
        ? prev.selectedProducts.filter((p) => p !== product)
        : [...prev.selectedProducts, product],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const errs = validateQuote();
    if (Object.keys(errs).length) { setQuoteErrors(errs); return; }
    setShowQuoteSummary(true);
  };

  const handleQuoteConfirm = () => setQuoteSubmitted(true);

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setQuoteForm(INITIAL_QUOTE);
    setErrors({});
    setQuoteErrors({});
    setSubmitted(false);
    setQuoteSubmitted(false);
    setShowQuoteSummary(false);
  };

  /* ── Render ── */

  return (
    <div className="contact-form-panel">
      <h2 className="contact-form-title">
        {isQuoteInquiry ? "Request a Quote" : "Send Us a Message"}
      </h2>
      <p className="contact-form-sub">
        {isQuoteInquiry
          ? "Fill in your machinery requirements and we'll provide a professional quotation."
          : "Fill in the details below and one of our engineers will be in touch with you shortly."}
      </p>

      {/* ── Success states ── */}
      {quoteSubmitted ? (
        <SuccessState
          title="Quote request submitted successfully!"
          message={`Thank you, ${form.firstName}. Our sales team will review your requirements and send a detailed quote to ${form.email} within 2 business days.`}
          btnLabel="Submit Another Quote"
          onReset={handleReset}
        />
      ) : submitted ? (
        <SuccessState
          title="Message sent successfully!"
          message={`Thank you, ${form.firstName}. We'll reply to ${form.email} within one business day.`}
          btnLabel="Send Another Message"
          onReset={handleReset}
        />
      ) : showQuoteSummary ? (
        <QuoteSummary
          form={form}
          quoteForm={quoteForm}
          onConfirm={handleQuoteConfirm}
          onEdit={() => setShowQuoteSummary(false)}
        />
      ) : (
        /* ── Main Form ── */
        <form
          className="contact-form"
          onSubmit={isQuoteInquiry ? handleQuoteSubmit : handleSubmit}
          noValidate
        >
          {/* Basic Info */}
          <div className="contact-form-row">
            <Field
              label="First Name *"
              name="firstName"
              placeholder="Rajesh"
              value={form.firstName}
              error={errors.firstName}
              onChange={handleChange}
            />
            <Field
              label="Last Name *"
              name="lastName"
              placeholder="Sharma"
              value={form.lastName}
              error={errors.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="contact-form-row">
            <Field
              label="Email Address *"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              error={errors.email}
              onChange={handleChange}
            />
            <Field
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+91 98765 00000"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="contact-form-row">
            <Field
              label="Company Name"
              name="company"
              placeholder="Your company"
              value={form.company}
              onChange={handleChange}
            />
            <div className="form-field">
              <label htmlFor="inquiryType">Inquiry Type *</label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={form.inquiryType}
                onChange={handleChange}
                className={errors.inquiryType ? "form-field-input--error" : ""}
              >
                {INQUIRY_TYPES.map((t) => (
                  <option key={t} value={t === INQUIRY_TYPES[0] ? "" : t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.inquiryType && <ErrorMsg msg={errors.inquiryType} />}
            </div>
          </div>

          {/* Product Inquiry – checkbox grid */}
          {form.inquiryType === "Product Inquiry" && (
            <div className="contact-products-section">
              <label>Select Product(s)</label>
              <div className="contact-products-grid">
                {PRODUCTS.map((product) => (
                  <label key={product} className="contact-product-option">
                    <input
                      type="checkbox"
                      checked={form.selectedProducts.includes(product)}
                      onChange={() => handleProductToggle(product)}
                    />
                    <span>{product}</span>
                  </label>
                ))}
              </div>
              <small>
                Leave blank if your inquiry is for multiple or unspecified
                products.
              </small>
            </div>
          )}

          {/* Quote-specific fields */}
          {isQuoteInquiry && (
            <QuoteForm
              quoteForm={quoteForm}
              onChange={handleQuoteChange}
              errors={quoteErrors}
              onProductToggle={handleQuoteProductToggle}
            />
          )}

          {/* Message */}
          <div className="form-field">
            <label htmlFor="message">
              {isQuoteInquiry ? "Additional Information" : "Message"} *
            </label>
            <textarea
              id="message"
              name="message"
              placeholder={
                isQuoteInquiry
                  ? "Describe your overall requirements and any specific questions..."
                  : "Describe your requirement, product of interest, capacity needed, etc."
              }
              value={form.message}
              onChange={handleChange}
              className={errors.message ? "form-field-input--error" : ""}
            />
            {errors.message && <ErrorMsg msg={errors.message} />}
          </div>

          <div className="contact-submit-row">
            <button type="submit" className="contact-submit-btn">
              {isQuoteInquiry ? "Review Quote" : "Send Message"}
              <FaPaperPlane style={{ fontSize: 14 }} />
            </button>
            <p className="contact-privacy-note">
              We respect your privacy.
              <br />
              Your details are never shared.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

/* ── Local success banner ── */
function SuccessState({ title, message, btnLabel, onReset }) {
  return (
    <div>
      <div className="contact-success">
        <div className="contact-success-icon">
          <FaCheckCircle />
        </div>
        <div className="contact-success-text">
          <strong>{title}</strong>
          {message}
        </div>
      </div>
      <button
        className="contact-submit-btn"
        style={{ marginTop: 24 }}
        onClick={onReset}
      >
        {btnLabel}
      </button>
    </div>
  );
}