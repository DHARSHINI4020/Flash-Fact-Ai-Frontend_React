import React from "react";
import { useParams } from "react-router-dom";

const ArticleDetail = ({ articles }) => {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id));

  if (!article) return <p>Article not found</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1>{article.title}</h1>
      <p>{article.description}</p>

      {article.mediaType === "video" && (
        <video width="100%" controls>
          <source src={article.mediaUrl} type="video/mp4" />
        </video>
      )}
      {article.mediaType === "audio" && (
        <audio controls>
          <source src={article.mediaUrl} type="audio/mpeg" />
        </audio>
      )}

      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
