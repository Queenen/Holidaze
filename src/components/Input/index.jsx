import styles from "./Input.module.css";
import PropTypes from "prop-types";

// Input Component
export const Input = ({
  type,
  value,
  handleChange,
  placeholder,
  id,
  required,
  isLabel,
  label,
  errorMessage,
  ...props
}) => {
  if (type === "checkbox") {
    return (
      <div className="d-flex align-content-center gap-3">
        {errorMessage && (
          <div className="text-danger small mb-1">{errorMessage}</div>
        )}
        <input
          className={`${styles.input} form-control rounded-5 m-0`}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          id={id}
          required={required}
          {...props}
        />
        {isLabel && <label htmlFor={id}>{label}</label>}
      </div>
    );
  }
  return (
    <div className="d-flex flex-column">
      {isLabel && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      {errorMessage && (
        <div className="text-danger small mb-1">{errorMessage}</div>
      )}
      <input
        className={`${styles.input} form-control rounded-5`}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        id={id}
        required={required}
        {...props}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  isLabel: PropTypes.bool,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  required: false,
  isLabel: true,
  errorMessage: "",
};

// TextArea Component
export const TextArea = ({
  value,
  handleChange,
  placeholder,
  id,
  required,
  isLabel,
  label,
  errorMessage,
  name,
  ...props
}) => {
  return (
    <div className="d-flex flex-column">
      {isLabel && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      {errorMessage && (
        <div className="text-danger small mb-1">{errorMessage}</div>
      )}
      <textarea
        className={`${styles.textarea} form-control rounded-5`}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        id={id}
        required={required}
        name={name}
        {...props}
      ></textarea>
    </div>
  );
};

TextArea.propTypes = {
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  isLabel: PropTypes.bool,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
};

TextArea.defaultProps = {
  placeholder: "",
  required: false,
  isLabel: true,
  errorMessage: "",
};

// Select Component
export const Select = ({
  defaultValue,
  handleChange,
  id,
  required,
  children,
  isLabel,
  label,
  errorMessage,
  ...props
}) => {
  return (
    <div className="d-flex flex-column">
      {isLabel && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      {errorMessage && (
        <div className="text-danger small mb-1">{errorMessage}</div>
      )}
      <select
        className={`${styles.select} form-select rounded-5`}
        defaultValue={defaultValue}
        onChange={handleChange}
        id={id}
        required={required}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

Select.propTypes = {
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node,
  isLabel: PropTypes.bool,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
};

Select.defaultProps = {
  required: false,
  isLabel: true,
  defaultValue: "",
  errorMessage: "",
};

// Option Component
export const Option = ({ value, children, ...props }) => {
  return (
    <option className={`${styles.option}`} value={value} {...props}>
      {children}
    </option>
  );
};

Option.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
};
