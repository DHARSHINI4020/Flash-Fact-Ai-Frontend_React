// ✅ src/hooks/useRealtimeArticleAlerts.js
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { getAllNews } from "../api/api";

export default function useRealtimeArticleAlerts() {
  const articleCountRef = useRef(0);

  useEffect(() => {
    const checkForNewArticles = async () => {
      try {
        // Call your backend
        const res = await getAllNews();
        const data = res.data?.data || [];

        // Check if count increased (new article added)
        if (articleCountRef.current && data.length > articleCountRef.current) {
          const diff = data.length - articleCountRef.current;
          toast.info(`📰 ${diff} new article${diff > 1 ? "s" : ""} published! Refresh to view.`, {
            position: "bottom-right",
            autoClose: 4000,
          });
        }

        // Update reference
        articleCountRef.current = data.length;
      } catch (error) {
        console.error("⚠️ Error checking for new articles:", error);
      }
    };

    // Run once immediately on mount
    checkForNewArticles();

    // Then poll every 60 seconds
    const interval = setInterval(checkForNewArticles, 60000);
    return () => clearInterval(interval);
  }, []);
}
