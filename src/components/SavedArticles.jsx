import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Stack } from "@mui/material";
import NewsCard from "./NewsCard";
import { toast } from "react-toastify";

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  const loadSaved = () => {
    const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(saved);
  };

  useEffect(() => {
    loadSaved();

    // ✅ Listen for save/remove events from NewsCard
    window.addEventListener("savedArticlesUpdated", loadSaved);

    return () => {
      window.removeEventListener("savedArticlesUpdated", loadSaved);
    };
  }, []);

  const handleClearAll = () => {
    if (savedArticles.length === 0) {
      toast.info("No saved articles to clear.", { autoClose: 2000 });
      return;
    }

    const confirmClear = window.confirm(
      "Are you sure you want to clear all saved articles?"
    );
    if (!confirmClear) return;

    localStorage.removeItem("savedArticles");
    setSavedArticles([]);
    toast.warn("🗑️ All saved articles cleared", { autoClose: 2000 });

    // Notify other tabs/pages if needed
    window.dispatchEvent(new Event("savedArticlesUpdated"));
  };

  if (savedArticles.length === 0) {
    return (
      <Typography align="center" sx={{ mt: 10 }}>
        No saved articles.
      </Typography>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4" fontWeight="bold">
          Saved Articles
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {savedArticles.map((article) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
            <NewsCard article={article} searchQuery="" />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SavedArticles;
