// src/components/MediaPlayer.jsx
import React from "react";

const MediaPlayer = ({ mediaUrl, type }) => {
  if (!mediaUrl) return null;

  return (
    <div style={{ marginTop: "10px" }}>
      {type === "video" ? (
        <video
          width="100%"
          height="auto"
          controls
          src={mediaUrl}
          style={{ borderRadius: "8px" }}
        >
          Your browser does not support the video tag.
        </video>
      ) : type === "audio" ? (
        <audio controls src={mediaUrl} style={{ width: "100%" }}>
          Your browser does not support the audio tag.
        </audio>
      ) : null}
    </div>
  );
};

export default MediaPlayer;
