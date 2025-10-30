import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HighlightedText from "./HighlightedText";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const NewsCard = ({ article, searchQuery }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSaved(savedArticles.some((a) => a.id === article.id));
  }, [article.id]);

  const toggleSave = (e) => {
    e.stopPropagation(); // prevent card click navigation
    const savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
    let updated;

    if (saved) {
      updated = savedArticles.filter((a) => a.id !== article.id);
    } else {
      updated = [...savedArticles, article];
    }

    localStorage.setItem("savedArticles", JSON.stringify(updated));
    setSaved(!saved);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea
        onClick={() => navigate(`/article/${article.id}`)}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardMedia
          component="img"
          height="140"
          image={article.image}
          alt={article.title}
        />
        <CardContent sx={{ flexGrow: 1, position: "relative" }}>
          <Typography variant="h6">
            <HighlightedText text={article.title} highlight={searchQuery} />
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <HighlightedText text={article.description} highlight={searchQuery} />
          </Typography>

          {/* Video / Audio Player */}
          {article.mediaUrl && article.mediaType === "video" && (
            <video
              src={article.mediaUrl}
              controls
              style={{ width: "100%", borderRadius: "4px", marginTop: "8px" }}
            />
          )}
          {article.mediaUrl && article.mediaType === "audio" && (
            <audio
              src={article.mediaUrl}
              controls
              style={{ width: "100%", marginTop: "8px" }}
            />
          )}

          {/* Save Button */}
          <IconButton
            onClick={toggleSave}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            {saved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
          </IconButton>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard;