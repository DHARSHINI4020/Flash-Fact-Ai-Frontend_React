import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const ArticleVideo = ({ article }) => {
  const [videoUrl, setVideoUrl] = useState(article?.videoUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const generateVideo = async () => {
    if (!article?._id) return;
    try {
      setLoading(true);
      setError(null);
      toast.info("🎥 Generating AI video...");

      const res = await axios.post(`${backendUrl}/api/news/${article._id}/generate-video`);
      const newUrl = res.data.videoUrl;

      if (newUrl) {
        const fullUrl = newUrl.startsWith("http") ? newUrl : `${backendUrl}${newUrl}`;
        setVideoUrl(fullUrl);
        toast.success("✅ Video ready!");
      } else {
        setError("Video generation did not return a valid URL.");
      }
    } catch (err) {
      console.error("Error generating video:", err);
      toast.error("❌ Failed to generate video.");
      setError("Failed to generate video. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        backgroundColor: "background.paper",
        textAlign: "center",
      }}
    >
      {loading ? (
        <Box sx={{ py: 4 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }} color="text.secondary">
            Generating AI video...
          </Typography>
        </Box>
      ) : videoUrl ? (
        <video
          key={videoUrl}
          controls
          width="100%"
          style={{
            borderRadius: "12px",
            maxHeight: "400px",
            background: "#000",
            marginTop: "8px",
          }}
          onError={() => {
            toast.error("⚠️ Failed to load video");
            console.error("Video load error:", videoUrl);
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            No video generated yet for this article.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={generateVideo}
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            🎬 Generate AI Video
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default ArticleVideo;
