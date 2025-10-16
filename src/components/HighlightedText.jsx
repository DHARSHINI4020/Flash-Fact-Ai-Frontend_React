import React from "react";
import { Typography } from "@mui/material";

const HighlightedText = ({ text, highlight }) => {
  if (!highlight) return <>{text}</>;

  // Split the text by matched parts (case-insensitive)
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <Typography component="span">
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span
            key={index}
            style={{
              backgroundColor: "#ffff00", // yellow highlight
              fontWeight: "bold",
            }}
          >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </Typography>
  );
};

export default HighlightedText;
