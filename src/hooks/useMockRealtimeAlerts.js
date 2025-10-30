import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useMockRealtimeAlerts() {
  useEffect(() => {
    // Sample alerts
    const alerts = [
      "📰 Breaking: React 20 just released with new hooks!",
      "🚀 SpaceX successfully launched a new satellite.",
      "🤖 AI model sets new benchmark in image recognition.",
      "🌍 Global climate summit begins today.",
      "💼 Major tech merger announced in Silicon Valley."
    ];

    const interval = setInterval(() => {
      // Pick random alert
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      toast.info(randomAlert);
    }, 15000); // every 15 seconds

    return () => clearInterval(interval);
  }, []);
}
