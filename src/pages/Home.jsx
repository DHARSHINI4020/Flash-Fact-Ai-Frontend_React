import { useState } from 'react'
import NewsCard from '../components/NewsCard'
import SearchBar from '../components/searchBar'
import VideoPlayer from '../components/VideoPlayer'
import AudioPlayer from '../components/AudioPlayer'

function Home() {
  const [query, setQuery] = useState('')

  const dummyNews = [
    { title: 'News 1', description: 'Description 1', url: '#', video: '#', audio: '#' },
    { title: 'News 2', description: 'Description 2', url: '#', video: '#', audio: '#' },
  ]

  const filteredNews = dummyNews.filter((news) =>
    news.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto p-4">
      <SearchBar query={query} setQuery={setQuery} />
      {filteredNews.map((news, idx) => (
        <div key={idx} className="mb-6">
          <NewsCard title={news.title} description={news.description} url={news.url} />
          <VideoPlayer src={news.video} title="Watch Video" />
          <AudioPlayer src={news.audio} title="Listen Audio" />
        </div>
      ))}
    </div>
  )
}

export default Home
