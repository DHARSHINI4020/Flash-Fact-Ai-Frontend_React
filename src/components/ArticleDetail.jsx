import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTextToSpeech from "../hooks/useTextToSpeech";

const ArticleDetail = ({ articles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === parseInt(id));

  const { speak, stop, isSpeaking } = useTextToSpeech();

  if (!article) return <p>Article not found</p>;

  const handleListen = () => {
    const textToRead = `${article.title}. ${article.content}`;
    speak(textToRead);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "10px" }}>
        ⬅ Back
      </button>

      <h1>{article.title}</h1>
      <p><strong>{article.source}</strong> • {article.date}</p>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      )}

      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        {!isSpeaking ? (
          <button onClick={handleListen} style={styles.listenBtn}>🔊 Listen</button>
        ) : (
          <button onClick={stop} style={styles.stopBtn}>⛔ Stop</button>
        )}
      </div>

      <p style={{ lineHeight: "1.7" }}>{article.content}</p>

      {/* ✅ Fixed media logic */}
      {article.mediaType === "video" && (
        <video
          controls
          src={article.mediaUrl}
          style={{ width: "100%", marginTop: "15px", borderRadius: "8px" }}
        />
      )}

      {article.mediaType === "audio" && (
        <audio
          controls
          src={article.mediaUrl}
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}
    </div>
  );
};

const styles = {
  listenBtn: {
    padding: "8px 14px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  stopBtn: {
    padding: "8px 14px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ArticleDetail;
