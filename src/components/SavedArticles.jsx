import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import NewsCard from "./NewsCard";

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(saved);
  }, []);

  if (savedArticles.length === 0) {
    return <Typography align="center" sx={{ mt: 10 }}>No saved articles.</Typography>;
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Saved Articles
      </Typography>

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
