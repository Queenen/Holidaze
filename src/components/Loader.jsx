import React, { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const Loader = ({ color = "#36d7b7", size = 60, delay = 4000, onTimeout }) => {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20rem",
      }}
    >
      <BounceLoader color={color} size={size} />
    </div>
  );
};

export default Loader;
