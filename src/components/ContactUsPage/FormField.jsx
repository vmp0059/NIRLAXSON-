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