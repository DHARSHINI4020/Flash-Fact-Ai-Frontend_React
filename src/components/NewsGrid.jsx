import React, { useState, useMemo } from "react";
import { Grid, Typography, TextField, List, ListItem, Paper } from "@mui/material";
import NewsCard from "./NewsCard";
import { debounce } from "lodash";

const NewsGrid = ({ articles }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
    debounceSearch(e.target.value);
  };

  const debounceSearch = useMemo(
    () =>
      debounce((query) => {
        setDebouncedQuery(query);
      }, 300),
    []
  );

  // Filter articles based on debounced query
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  // Suggestions (title matches)
  const suggestions = articles
    .filter((article) =>
      article.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
    .map((article) => article.title);

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Latest News
      </Typography>

      {/* Search bar */}
      <div style={{ position: "relative" }}>
        <TextField
          label="Search news..."
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={handleSearchChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />

        {/* Suggestions dropdown */}
        {showSuggestions && searchQuery && suggestions.length > 0 && (
          <Paper
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 10,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            <List>
              {suggestions.map((title, index) => (
                <ListItem
                  button
                  key={index}
                  onMouseDown={() => {
                    setSearchQuery(title);
                    setDebouncedQuery(title);
                    setShowSuggestions(false);
                  }}
                >
                  {title}
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </div>

      {/* News grid */}
      <Grid container spacing={3}>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
              <NewsCard article={article} searchQuery={debouncedQuery} />
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