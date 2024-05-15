import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ children, onClick, type, size }) {
  const buttonClass = size === "big" ? styles.bigBtn : styles.smallBtn;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles.button} ${buttonClass}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  size: PropTypes.oneOf(["big", "small"]),
};

Button.defaultProps = {
  type: "submit",
  size: "big",
};

export default Button;

// Example usage

/*
import React from "react";
import Button from "./Button";

function Example() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="App">
      <Button onClick={handleClick} type="button">
        Big Button
      </Button>

      <Button onClick={handleClick} type="button" size="small">
        Small Button
      </Button>
    </div>
  );
}

export default Example;
*/
