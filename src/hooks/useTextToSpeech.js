// src/hooks/useTextToSpeech.js
import { useState, useEffect } from "react";

export default function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text) => {
    if (!window.speechSynthesis) return alert("TTS not supported in this browser.");

    window.speechSynthesis.cancel(); // Stop any existing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => stop(); // Auto stop on unmount
  }, []);

  return { speak, stop, isSpeaking };
}
