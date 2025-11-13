import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Chip,
  Box,
  Stack,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// Icons
import WhatshotIcon from "@mui/icons-material/Whatshot";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StopIcon from "@mui/icons-material/Stop";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LaunchIcon from "@mui/icons-material/Launch";

import HighlightedText from "./HighlightedText";
import useTextToSpeech from "../hooks/useTextToSpeech";

const categoryColors = {
  business: "#0288d1",
  sports: "#2e7d32",
  technology: "#1565c0",
  entertainment: "#8e24aa",
  health: "#d32f2f",
  science: "#f9a825",
  other: "#9e9e9e",
};

const NewsCard = ({ article, searchQuery, index }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { speak, stop, isSpeaking } = useTextToSpeech();

  const articleId = article._id || article.id;
  const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const [videoUrl, setVideoUrl] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(false);

  // Load saved and cached video on mount
  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSaved(savedArticles.some((a) => a.id === articleId));

    const storedVideos = JSON.parse(localStorage.getItem("articleVideos")) || {};
    if (storedVideos[articleId]) {
      setVideoUrl(storedVideos[articleId]);
    } else if (article.videoUrl) {
      setVideoUrl(article.videoUrl);
    }
  }, [articleId, article.videoUrl]);

  // Toggle save
  const toggleSave = (e) => {
    e.stopPropagation();
    const savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
    let updated;

    if (saved) {
      updated = savedArticles.filter((a) => a.id !== articleId);
      toast.info("🗑️ Removed from Saved Articles", { autoClose: 1200 });
    } else {
      updated = [...savedArticles, article];
      toast.success("💾 Added to Saved Articles", { autoClose: 1200 });
    }

    localStorage.setItem("savedArticles", JSON.stringify(updated));
    setSaved(!saved);
    window.dispatchEvent(new Event("savedArticlesUpdated"));
  };

  // Text-to-speech
  const handleTTS = (e) => {
    e.stopPropagation();
    if (isSpeaking) stop();
    else speak(article.summary || article.title);
  };

  // Generate AI Video
  const generateVideo = async (e) => {
    e.stopPropagation();
    try {
      setLoadingVideo(true);
      toast.info("🎥 Generating AI video...");
      const res = await axios.post(`${backendUrl}/api/news/${articleId}/generate-video`);
      const newUrl = res.data.videoUrl;

      if (newUrl) {
        const fullUrl = newUrl.startsWith("http") ? newUrl : `${backendUrl}${newUrl}`;
        setVideoUrl(fullUrl);

        const storedVideos = JSON.parse(localStorage.getItem("articleVideos")) || {};
        storedVideos[articleId] = fullUrl;
        localStorage.setItem("articleVideos", JSON.stringify(storedVideos));

        toast.success("✅ Video ready!");
      } else {
        toast.error("⚠️ Video generation failed.");
      }
    } catch (err) {
      console.error("Video generation error:", err);
      toast.error("❌ Failed to generate video.");
    } finally {
      setLoadingVideo(false);
    }
  };

  const category = article.category?.toLowerCase() || "other";
  const categoryColor = categoryColors[category] || "#9e9e9e";
  const isTrending = article.viewCount > 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: hovered ? 6 : 2,
          transition: "all 0.3s ease",
          cursor: "pointer",
          p: 2,
          height: 360,
          maxHeight: 360,
        }}
        onClick={() => navigate(`/article/${articleId}`)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hover Overlay */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            className="absolute inset-0 bg-black"
          />
        )}

        {/* Top Bar */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1, zIndex: 2 }}
        >
          <Chip
            label={article.category || "Other"}
            size="small"
            sx={{
              textTransform: "capitalize",
              backgroundColor: `${categoryColor}22`,
              color: categoryColor,
              fontWeight: 600,
            }}
          />
          <Stack direction="row" spacing={0.5} alignItems="center">
            {isTrending && (
              <Tooltip title="Trending">
                <WhatshotIcon sx={{ color: "#e53935", fontSize: 18 }} />
              </Tooltip>
            )}
            <Tooltip title={saved ? "Remove Bookmark" : "Save Article"}>
              <IconButton size="small" onClick={toggleSave}>
                {saved ? (
                  <BookmarkIcon sx={{ color: "#0288d1" }} />
                ) : (
                  <BookmarkBorderIcon />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title={isSpeaking ? "Stop Reading" : "Read Summary"}>
              <IconButton size="small" onClick={handleTTS}>
                {isSpeaking ? <StopIcon color="error" /> : <VolumeUpIcon />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Title */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            mb: 0.5,
          }}
        >
          <HighlightedText text={article.title} highlight={searchQuery} />
        </Typography>

        {/* Summary */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            mb: 1.5,
          }}
        >
          <HighlightedText
            text={article.summary || article.description || ""}
            highlight={searchQuery}
          />
        </Typography>

        {/* 🎬 Video Section */}
        <Box sx={{ mt: "auto", zIndex: 2 }}>
          {loadingVideo ? (
            <Stack alignItems="center" spacing={1}>
              <CircularProgress size={24} />
              <Typography variant="caption" color="text.secondary">
                Generating video...
              </Typography>
            </Stack>
          ) : videoUrl ? (
            <video
              key={videoUrl}
              controls
              width="100%"
              style={{
                borderRadius: "8px",
                height: 140,
                background: "#000",
                objectFit: "cover",
              }}
              onError={() => toast.error("⚠️ Failed to load video")}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={generateVideo}
              fullWidth
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                height: 40,
              }}
            >
              🎬 Generate AI Video
            </Button>
          )}
        </Box>

        {/* Footer */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Typography variant="caption" color="text.secondary">
            {article.author || "Unknown"} •{" "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>

          {hovered && (
            <Tooltip title="Read full article">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/article/${articleId}`);
                }}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Card>
    </motion.div>
  );
};

export default NewsCard;
