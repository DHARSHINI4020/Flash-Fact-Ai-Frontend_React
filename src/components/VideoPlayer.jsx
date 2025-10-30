// src/components/VideoPlayer.jsx
import React from "react";

export default function VideoPlayer({ src }) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <video
        className="w-full rounded-lg shadow-lg"
        controls
        autoPlay
        loop
        muted
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}