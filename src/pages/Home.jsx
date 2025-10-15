import React from "react";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const mockNews = [
    { 
      title: "React 19 Released!", 
      description: "Amazing updates in React 19.", 
      imageUrl: "https://via.placeholder.com/600x300",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      audioUrl: "https://www.w3schools.com/html/horse.mp3"
    },
    { 
      title: "AI in Frontend", 
      description: "AI helps build UI faster.", 
      imageUrl: "https://via.placeholder.com/600x300"
    },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <SearchBar placeholder="Search news..." />
      {mockNews.map((news, index) => (
        <NewsCard
          key={index}
          title={news.title}
          description={news.description}
          imageUrl={news.imageUrl}
          videoUrl={news.videoUrl}
          audioUrl={news.audioUrl}
        />
      ))}
    </div>
  );
}
