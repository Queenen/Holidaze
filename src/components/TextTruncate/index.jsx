import React from "react";
import styles from "./TextTruncate.module.css";

const TextTruncate = ({ text, maxLength, maxLines, className }) => {
  const truncatedText = () => {
    let truncated = text;
    if (text.length > maxLength) {
      truncated = text.slice(0, maxLength);
      truncated += "...";
    }
    return truncated;
  };

  return (
    <span
      className={`${styles.truncate} ${className}`}
      style={{
        WebkitLineClamp: maxLines,
      }}
    >
      {truncatedText()}
    </span>
  );
};

export default TextTruncate;
