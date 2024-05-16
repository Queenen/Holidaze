import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ children, onClick, type, size, errorMessage, name }) {
  const buttonClass = size === "big" ? styles.bigBtn : styles.smallBtn;

  return (
    <>
      {errorMessage && (
        <div className="text-danger small mb-1">{errorMessage}</div>
      )}
      <button
        onClick={onClick}
        type={type}
        name={name}
        className={`${styles.button} ${buttonClass}`}
      >
        {children}
      </button>
    </>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  size: PropTypes.oneOf(["big", "small"]),
  name: PropTypes.string,
  errorMessage: PropTypes.string,
};

Button.defaultProps = {
  type: "submit",
  size: "big",
  errorMessage: "",
};

export default Button;
