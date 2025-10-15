import React, { useState } from "react";
import { Grid, Typography, TextField } from "@mui/material";
import NewsCard from "./NewsCard";

const NewsGrid = ({ articles }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter articles based on search query
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Latest News
      </Typography>

      {/* Search bar */}
      <TextField
        label="Search news..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Grid container spacing={3}>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
              <NewsCard article={article} />
            </Grid>
          ))
        ) : (
          <Typography align="center" sx={{ width: "100%", mt: 4 }}>
            No articles found.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default NewsGrid;
