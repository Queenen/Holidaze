import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({
  children,
  onClick,
  type,
  size,
  errorMessage,
  name,
  variation,
}) {
  const buttonClass = size === "big" ? styles.bigBtn : styles.smallBtn;
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
        className={`${styles.button} ${buttonClass} ${variationClass}`}
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
  size: PropTypes.oneOf(["big", "small"]),
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  variation: PropTypes.oneOf(["", "deleteBtn"]),
};

Button.defaultProps = {
  type: "submit",
  size: "big",
  errorMessage: "",
  variation: "",
};

export default Button;
