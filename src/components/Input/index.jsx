import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

export const Input = ({
  type,
  onChange,
  placeholder,
  id,
  required,
  isLabel,
  label,
  errorMessage,
  ...props
}) => {
  const inputClassNames = `${styles.input} form-control rounded-5 m-0 w-100`;

  return (
    <div
      className={`d-flex ${
        type === "checkbox" || type === "search"
          ? "align-items-center gap-3"
          : "flex-column"
      }`}
    >
      {isLabel && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      {errorMessage && (
        <div className="text-danger small mb-1">{errorMessage}</div>
      )}
      <input
        className={inputClassNames}
        type={type}
        onChange={onChange}
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
  onChange: PropTypes.func,
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
  handleChange,
  placeholder,
  id,
  required,
  isLabel,
  label,
  errorMessage,
  name,
  ...props
}) => (
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
      onChange={handleChange}
      placeholder={placeholder}
      id={id}
      required={required}
      name={name}
      {...props}
    ></textarea>
  </div>
);

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
  handleChange,
  id,
  required,
  children,
  isLabel,
  label,
  errorMessage,
  ...props
}) => (
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
      onChange={handleChange}
      id={id}
      required={required}
      {...props}
    >
      {children}
    </select>
  </div>
);

Select.propTypes = {
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
};

// Option Component
export const Option = ({ children, ...props }) => (
  <option className={styles.option} {...props}>
    {children}
  </option>
);

Option.propTypes = {
  children: PropTypes.node,
};
