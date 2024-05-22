import React, { useState, useEffect, useRef } from "react";
import styles from "./TextTruncate.module.css";

const TextTruncate = ({
  text = "",
  className,
  maxLength = 0,
  useMaxLength = false,
}) => {
  const [truncatedText, setTruncatedText] = useState(text);
  const spanRef = useRef(null);

  useEffect(() => {
    if (useMaxLength && maxLength > 0) {
      const truncated =
        text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
      setTruncatedText(truncated);
    } else {
      const handleResize = () => {
        const spanElement = spanRef.current;
        if (spanElement) {
          const isOverflowing =
            spanElement.offsetWidth < spanElement.scrollWidth;

          if (isOverflowing) {
            let truncated = text;
            for (let i = text.length - 1; i >= 0; i--) {
              truncated = text.slice(0, i) + "...";
              if (spanRef.current.offsetWidth >= spanRef.current.scrollWidth) {
                setTruncatedText(truncated);
                break;
              }
            }
          } else {
            setTruncatedText(text);
          }
        }
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [text, useMaxLength, maxLength]);

  return (
    <span
      ref={spanRef}
      className={`${styles.truncate} ${className} ${
        !useMaxLength ? styles.default : ""
      }`}
    >
      {truncatedText}
    </span>
  );
};

export default TextTruncate;
