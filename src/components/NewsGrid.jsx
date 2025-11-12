import React, { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Typography,
  TextField,
  List,
  ListItem,
  Paper,
  Pagination,
  Stack,
  Box,
  MenuItem,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import NewsCard from "./NewsCard";

const categoryColors = {
  business: "info",
  sports: "success",
  technology: "primary",
  entertainment: "secondary",
  health: "error",
  science: "warning",
  politics: "secondary",
  other: "default",
};

const NewsGrid = ({ articles }) => {
  const theme = useTheme(); // 👈 get current theme (light/dark)
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const articlesPerPage = 6;

  if (!Array.isArray(articles)) {
    return (
      <Typography align="center" sx={{ mt: 6, color: "gray" }}>
        No articles available.
      </Typography>
    );
  }

  // 🕒 Debounce search input
  const debounceSearch = useMemo(
    () =>
      debounce((q) => {
        setDebouncedQuery(q);
      }, 300),
    []
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
    debounceSearch(e.target.value);
  };

  // 🔁 Reset page when search/category changes
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, category]);

  // 🧠 Dynamically build unique categories
  const uniqueCategories = useMemo(() => {
    const cats = [
      ...new Set(
        articles
          .map((a) => a.category?.toLowerCase().trim())
          .filter(Boolean)
      ),
    ];
    return ["all", ...cats.sort()];
  }, [articles]);

  // 🎯 Filter articles
  const filteredArticles = articles.filter((a) => {
    const title = a.title?.toLowerCase() || "";
    const desc = (a.summary || a.description || "").toLowerCase();
    const q = debouncedQuery.toLowerCase();
    const matchesSearch = title.includes(q) || desc.includes(q);
    const matchesCategory =
      category === "all" || a.category?.toLowerCase() === category;
    return matchesSearch && matchesCategory;
  });

  // 📑 Pagination logic
  const startIndex = (page - 1) * articlesPerPage;
  const paginated = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  // 💡 Suggestions
  const suggestions = articles
    .filter((a) =>
      a.title?.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
    .map((a) => a.title);

  const fadeSlide = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        paddingBottom: "60px",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* 🧭 Sticky Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 120,
          background:
            theme.palette.mode === "dark"
              ? "rgba(18,18,18,0.95)"
              : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 8px rgba(255,255,255,0.1)"
              : "0 2px 8px rgba(0,0,0,0.08)",
          borderBottom:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid #eee",
        }}
      >
        <motion.div
          variants={fadeSlide}
          initial="hidden"
          animate="show"
          style={{
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            sx={{
              mb: 1,
              color:
                theme.palette.mode === "dark"
                  ? "#fff"
                  : "#222",
            }}
          >
            Latest News
          </Typography>

          {/* 📂 Category Dropdown + 🔍 Search Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: 1000,
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {/* 📂 Category Dropdown FIRST */}
            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{
                width: 220,
                borderRadius: 1,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "#ffffff",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 1px 4px rgba(255,255,255,0.05)"
                    : "0 1px 4px rgba(0,0,0,0.05)",
                color: theme.palette.text.primary,
              }}
            >
              {uniqueCategories.map((cat) => (
                <MenuItem
                  key={cat}
                  value={cat}
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? "#fff"
                        : "#000",
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </TextField>

            {/* 🔍 Search Field NEXT */}
            <Box sx={{ flex: "1 1 60%", position: "relative" }}>
              <TextField
                label="Search news..."
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "#ffffff",
                  borderRadius: 1,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 1px 4px rgba(255,255,255,0.05)"
                      : "0 1px 4px rgba(0,0,0,0.05)",
                  input: {
                    color:
                      theme.palette.mode === "dark"
                        ? "#fff"
                        : "#000",
                  },
                  "& label": {
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.6)",
                  },
                }}
              />

              {/* 💬 Suggestions Dropdown */}
              {showSuggestions && searchQuery && suggestions.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    maxHeight: 220,
                    overflowY: "auto",
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "#2a2a2a"
                        : "#ffffff",
                    color:
                      theme.palette.mode === "dark"
                        ? "#fff"
                        : "#000",
                  }}
                >
                  <List>
                    {suggestions.map((title, idx) => (
                      <ListItem
                        button
                        key={idx}
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
            </Box>
          </Box>
        </motion.div>
      </div>

      {/* 📰 News Cards Grid */}
      <Grid container spacing={4} sx={{ maxWidth: 1200, margin: "40px auto" }}>
        {paginated.length > 0 ? (
          paginated.map((a, idx) => (
            <motion.div
              key={a.id || a._id || idx}
              variants={fadeSlide}
              initial="hidden"
              animate="show"
            >
              <Grid item xs={12} sm={6} md={4}>
                <NewsCard article={a} searchQuery={debouncedQuery} index={idx} />
              </Grid>
            </motion.div>
          ))
        ) : (
          <Typography align="center" sx={{ width: "100%", mt: 4 }}>
            No articles found.
          </Typography>
        )}
      </Grid>

      {/* 📄 Pagination */}
      {filteredArticles.length > articlesPerPage && (
        <Stack alignItems="center" sx={{ mt: 3 }}>
          <Pagination
            count={Math.ceil(filteredArticles.length / articlesPerPage)}
            page={page}
            onChange={(e, v) => setPage(v)}
            color="primary"
            shape="rounded"
          />
        </Stack>
      )}
    </div>
  );
};

export default NewsGrid;
