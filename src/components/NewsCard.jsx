function NewsCard({ title, description, url }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      <a href={url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
        Read more
      </a>
    </div>
  )
}

export default NewsCard
