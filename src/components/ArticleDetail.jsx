import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById } from "../api/api";
import {
  Button,
  Container,
  Typography,
  Paper,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StopIcon from "@mui/icons-material/Stop";
import useTextToSpeech from "../hooks/useTextToSpeech";
import { toast } from "react-toastify";
import axios from "axios";

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const { speak, stop, isSpeaking } = useTextToSpeech();

  const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  // 🧠 Fetch article
  useEffect(() => {
    getNewsById(id)
      .then((res) => {
        const fetched = res.data;
        setArticle(fetched);

        // ✅ Try to restore cached video (persistent across sessions)
        const cachedVideos = JSON.parse(localStorage.getItem("generatedVideos")) || {};
        if (fetched.videoUrl) {
          setVideoUrl(fetched.videoUrl.startsWith("http") ? fetched.videoUrl : `${backendUrl}${fetched.videoUrl}`);
        } else if (cachedVideos[id]) {
          setVideoUrl(cachedVideos[id]);
        }
      })
      .catch(() => console.error("Error loading article"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleTTS = () => {
    if (isSpeaking) stop();
    else speak(article.content || article.summary || article.title);
  };

  // 🎬 Generate video if not available
  const generateVideo = async () => {
    try {
      setLoadingVideo(true);
      toast.info("🎥 Generating AI video...");

      const res = await axios.post(`${backendUrl}/api/news/${id}/generate-video`);
      const newUrl = res.data.videoUrl;

      if (newUrl) {
        const fullUrl = newUrl.startsWith("http") ? newUrl : `${backendUrl}${newUrl}`;
        setVideoUrl(fullUrl);

        // ✅ Cache for persistence
        const cachedVideos = JSON.parse(localStorage.getItem("generatedVideos")) || {};
        cachedVideos[id] = fullUrl;
        localStorage.setItem("generatedVideos", JSON.stringify(cachedVideos));

        toast.success("✅ Video generated successfully!");
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

  if (loading)
    return (
      <Container maxWidth="md" sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading article...
        </Typography>
      </Container>
    );

  if (!article)
    return (
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Typography variant="h6" color="error" textAlign="center">
          Article not found.
        </Typography>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Back and TTS controls */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          ← Back
        </Button>
        <IconButton onClick={handleTTS}>
          {isSpeaking ? <StopIcon color="error" /> : <VolumeUpIcon color="action" />}
        </IconButton>
      </Stack>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {article.title}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {article.author || "Unknown"} • {article.category} •{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, whiteSpace: "pre-line" }}>
          {article.content}
        </Typography>

        {/* 🎬 Video Section */}
        <Stack sx={{ mt: 3 }}>
          {loadingVideo ? (
            <Stack alignItems="center">
              <CircularProgress size={28} />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                Generating video...
              </Typography>
            </Stack>
          ) : videoUrl ? (
            <video
              key={videoUrl}
              src={videoUrl}
              controls
              style={{
                width: "100%",
                borderRadius: "6px",
                marginTop: "20px",
                background: "#000",
              }}
              crossOrigin="anonymous"
              onError={() => {
                toast.error("⚠️ Failed to load video");
                console.error("Video load error:", videoUrl);
              }}
            />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={generateVideo}
              sx={{ borderRadius: "8px", mt: 2, textTransform: "none" }}
            >
              🎥 Generate AI Video
            </Button>
          )}
        </Stack>

        {/* 🔊 Optional voice audio */}
        {article.voiceUrl && (
          <audio
            src={article.voiceUrl}
            controls
            style={{
              width: "100%",
              marginTop: "20px",
            }}
          />
        )}
      </Paper>
    </Container>
  );
}

export default ArticleDetail;
