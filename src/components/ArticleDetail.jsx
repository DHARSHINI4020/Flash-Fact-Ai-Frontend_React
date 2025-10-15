import React from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";

const ArticleDetail = ({ articles }) => {
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) return <Typography align="center" sx={{ mt: 10 }}>Article not found</Typography>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Typography variant="h3" gutterBottom>{article.title}</Typography>
      <img src={article.image} alt={article.title} style={{ width: "100%", marginBottom: "20px" }} />
      <Typography variant="body1" paragraph>{article.content}</Typography>
      <Button component={Link} to="/" variant="contained">Back to News</Button>
    </div>
  );
};

export default ArticleDetail;
