import { useState } from "react";
import { FaCheckCircle, FaStar, FaRegStar, FaCommentDots } from "react-icons/fa";
import { Field, ErrorMsg } from "./FormField";
import "./FeedbackForm.css";

const EXPERIENCE_TYPES = [
  "Product Quality",
  "Sales & Quotation Process",
  "Delivery & Installation",
  "After-Sales Support",
  "Website Experience",
  "General Feedback",
];

const RECOMMEND_OPTIONS = ["Definitely", "Probably", "Not Sure", "Unlikely"];

/**
 * FeedbackForm – standalone section for collecting customer feedback.
 * Includes: star rating, experience type, recommendation, and comment.
 */
export default function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    hoverRating: 0,
    experienceType: "",
    recommend: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.rating) e.rating = "Please select a rating";
    if (!form.experienceType) e.experienceType = "Please select a type";
    if (!form.comment.trim()) e.comment = "Please share your feedback";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleStarClick = (star) => {
    setForm((prev) => ({ ...prev, rating: star }));
    if (errors.rating) setErrors((prev) => ({ ...prev, rating: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      rating: 0,
      hoverRating: 0,
      experienceType: "",
      recommend: "",
      comment: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
  const activeRating = form.hoverRating || form.rating;

  return (
    <section className="feedback-section">
      <div className="feedback-section-inner">
        {/* Header */}
        <div className="feedback-header">
          <div className="feedback-header-icon">
            <FaCommentDots />
          </div>
          <div>
            <span className="feedback-eyebrow">We Value Your Opinion</span>
            <h2 className="feedback-title">Share Your Feedback</h2>
            <p className="feedback-subtitle">
              Help us improve by sharing your experience with Nirlax Machinery.
              Your feedback directly shapes how we serve our customers.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="feedback-success">
            <div className="feedback-success-icon">
              <FaCheckCircle />
            </div>
            <div className="feedback-success-text">
              <strong>Thank you for your feedback, {form.name}!</strong>
              We truly appreciate you taking the time. Your response has been
              recorded and will help us serve you better.
            </div>
            <button className="feedback-submit-btn" onClick={handleReset}>
              Submit Another Response
            </button>
          </div>
        ) : (
          <form
            className="feedback-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Name + Email */}
            <div className="feedback-form-row">
              <Field
                label="Your Name *"
                name="name"
                placeholder="Rajesh Sharma"
                value={form.name}
                error={errors.name}
                onChange={handleChange}
              />
              <Field
                label="Email Address *"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
              />
            </div>

            {/* Star Rating */}
            <div className="feedback-rating-group">
              <label className="feedback-label">Overall Rating *</label>
              <div className="feedback-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`feedback-star ${
                      star <= activeRating ? "feedback-star--active" : ""
                    }`}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() =>
                      setForm((prev) => ({ ...prev, hoverRating: star }))
                    }
                    onMouseLeave={() =>
                      setForm((prev) => ({ ...prev, hoverRating: 0 }))
                    }
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    {star <= activeRating ? <FaStar /> : <FaRegStar />}
                  </button>
                ))}
                {activeRating > 0 && (
                  <span className="feedback-rating-label">
                    {ratingLabels[activeRating]}
                  </span>
                )}
              </div>
              {errors.rating && <ErrorMsg msg={errors.rating} />}
            </div>

            {/* Experience Type */}
            <div className="form-field">
              <label htmlFor="experienceType">
                What are you sharing feedback about? *
              </label>
              <select
                id="experienceType"
                name="experienceType"
                value={form.experienceType}
                onChange={handleChange}
                className={errors.experienceType ? "form-field-input--error" : ""}
              >
                <option value="">Select experience type...</option>
                {EXPERIENCE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.experienceType && (
                <ErrorMsg msg={errors.experienceType} />
              )}
            </div>

            {/* Recommend */}
            <div className="feedback-recommend-group">
              <label className="feedback-label">
                Would you recommend us to others?
              </label>
              <div className="feedback-recommend-options">
                {RECOMMEND_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className={`feedback-recommend-option ${
                      form.recommend === option
                        ? "feedback-recommend-option--active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="recommend"
                      value={option}
                      checked={form.recommend === option}
                      onChange={handleChange}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="form-field">
              <label htmlFor="comment">Your Feedback *</label>
              <textarea
                id="comment"
                name="comment"
                placeholder="Tell us about your experience — what went well, what could be improved, or anything else you'd like to share..."
                value={form.comment}
                onChange={handleChange}
                className={errors.comment ? "form-field-input--error" : ""}
                style={{ minHeight: 140 }}
              />
              {errors.comment && <ErrorMsg msg={errors.comment} />}
            </div>

            <div className="feedback-submit-row">
              <button type="submit" className="feedback-submit-btn">
                Submit Feedback
              </button>
              <p className="feedback-privacy-note">
                Your feedback is confidential and used only to improve our
                services.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}