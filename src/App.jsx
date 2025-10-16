import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsGrid from "./components/NewsGrid";
import ArticleDetail from "./components/ArticleDetail";
import SavedArticles from "./components/SavedArticles";
import Header from "./components/Header";
const mockArticles = [
  {
    id: 1,
    title: "React 20 Released!",
    description: "React 20 comes with amazing new features.",
    image: "https://via.placeholder.com/300x180?text=React+20",
    content: "Full details about React 20 with all new features, updates, and examples.",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // example video
    mediaType: "video",
  },
  {
    id: 2,
    title: "AI Revolution",
    description: "AI is transforming industries rapidly.",
    image: "https://via.placeholder.com/300x180?text=AI+Revolution",
    content: "Full details about AI Revolution, applications in industry and research.",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // example audio
    mediaType: "audio",
  },
  {
    id: 3,
    title: "SpaceX Launch",
    description: "SpaceX successfully launched a new satellite.",
    image: "https://via.placeholder.com/300x180?text=SpaceX+Launch",
    content: "Full details about SpaceX's latest launch and satellite info.",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4", // example video
    mediaType: "video",
  },
  {
    id: 4,
    title: "Climate Change Update",
    description: "Global climate reports show rising temperatures.",
    image: "https://via.placeholder.com/300x180?text=Climate+Change",
    content: "Full report on climate change, data, and impacts worldwide.",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // example audio
    mediaType: "audio",
  },
  // Add more articles as needed
];

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<NewsGrid articles={mockArticles} />} />
        <Route path="/article/:id" element={<ArticleDetail articles={mockArticles} />} />
        <Route path="/saved" element={<SavedArticles />} />
      </Routes>
    </>
  );
}

export default App;
