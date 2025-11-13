import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NewsGrid from "./components/NewsGrid";
import ArticleDetail from "./components/ArticleDetail";
import SavedArticles from "./components/SavedArticles";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import useMockRealtimeAlerts from "./hooks/useRealtimeArticleAlerts";
import { getAllNews } from "./api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme, Box, Typography, CircularProgress } from "@mui/material";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme(); // 🎨 Access the current theme
  useMockRealtimeAlerts();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllNews();

        // ✅ Backend returns { data: [...], pagination: {...} }
        const raw = res.data?.data || [];

        // ✅ Normalize backend data for frontend
        const formatted = raw.map((a) => ({
          id: a._id || a.id,
          title: a.title || "Untitled",
          description: a.summary || a.content?.slice(0, 120) || "",
          image:
            a.image ||
            "https://via.placeholder.com/300x180?text=FlashFact+AI",
          mediaUrl: a.videoUrl || a.voiceUrl || null,
          mediaType: a.videoUrl ? "video" : a.voiceUrl ? "audio" : null,
          content: a.content || "",
          category: a.category || "general",
          author: a.author || "Unknown",
          source: a.source || "FlashFact AI",
          sentiment: a.sentiment || "neutral",
          factCheckStatus: a.factCheckStatus || "pending",
          publishedAt: a.publishedAt,
        }));

        console.log("✅ Loaded articles:", formatted);
        setArticles(formatted);
      } catch (error) {
        console.error("❌ Error fetching news:", error);
        toast.error("Failed to fetch news from backend");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />

      {loading ? (
        <Box
          sx={{
            textAlign: "center",
            mt: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[300]
                : theme.palette.text.secondary,
          }}
        >
          <CircularProgress
            size={32}
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[300]
                  : theme.palette.text.secondary,
            }}
          >
            Loading news...
          </Typography>
        </Box>
      ) : (
        <Routes>
          <Route path="/" element={<NewsGrid articles={articles} />} />
          <Route
            path="/article/:id"
            element={<ArticleDetail articles={articles} />}
          />
          <Route path="/saved" element={<SavedArticles />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      )}

      {/* ✅ Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.palette.mode === "dark" ? "dark" : "light"} // adapts toast theme
      />
    </>
  );
}

export default App;
