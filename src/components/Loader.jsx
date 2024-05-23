import React, { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import PropTypes from "prop-types";

const Loader = ({ color, size, delay, onTimeout }) => {
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
      if (onTimeout) onTimeout();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, onTimeout]);

  if (timeoutReached) return null;

  return (
    <div style={styles.loaderContainer}>
      <BounceLoader color={color} size={size} />
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20rem",
  },
};

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  delay: PropTypes.number,
  onTimeout: PropTypes.func,
};

Loader.defaultProps = {
  color: "#36d7b7",
  size: 60,
  delay: 4000,
  onTimeout: null,
};

export default Loader;
