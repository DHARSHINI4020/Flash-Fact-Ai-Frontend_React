// src/components/AudioPlayer.jsx
import React from 'react';

export default function AudioPlayer({ src, title }) {
  if (!src) return null; // no audio, skip

  return (
    <div className="my-4">
      <audio controls className="w-full">
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {title && <p className="mt-2 text-gray-700 dark:text-gray-300">{title}</p>}
    </div>
  );
}
