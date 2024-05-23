import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ children, onClick, type, errorMessage, name, variation }) {
  const variationClass =
    variation === "deleteBtn" ? styles.deleteBtn : styles.defaultBtn;

  return (
    <>
      {errorMessage && (
        <div className="text-danger small mb-1">{errorMessage}</div>
      )}
      <button
        onClick={onClick}
        type={type}
        name={name}
        className={`${styles.button} ${variationClass}`}
      >
        {children}
      </button>
    </>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  variation: PropTypes.oneOf(["", "deleteBtn"]),
};

Button.defaultProps = {
  type: "submit",
  errorMessage: "",
  variation: "",
};

export default Button;
