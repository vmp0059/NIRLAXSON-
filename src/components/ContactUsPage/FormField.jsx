/**
 * FormField.jsx
 * Reusable form components: Field (text/email/tel/select) and ErrorMsg
 */

/**
 * ErrorMsg - Display validation error messages
 * @param {string} msg - Error message to display
 */
export function ErrorMsg({ msg }) {
  if (!msg) return null;
  return <div className="form-field-error">{msg}</div>;
}

/**
 * Honeypot - a field people never see or reach, so only bots fill it in.
 * Off-screen and out of the layout (absolutely positioned), hidden from
 * screen readers and skipped by Tab. The server silently drops any
 * submission where it has a value.
 */
export function Honeypot({ value, onChange }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
    >
      <label>
        Website
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

/**
 * Field - Reusable text input with label and error display
 * Supports: text, email, tel, password, etc.
 */
export function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
}) {
  return (
    <div className="form-field">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={error ? "form-field-input--error" : ""}
      />
      {error && <ErrorMsg msg={error} />}
    </div>
  );
}