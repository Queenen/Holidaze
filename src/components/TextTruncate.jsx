import React from "react";

const TextTruncate = ({ text, maxLength, maxLines }) => {
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
      style={{
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {truncatedText()}
    </span>
  );
};

export default TextTruncate;
