function VideoPlayer({ src, title }) {
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <video controls className="w-full rounded-lg shadow-md">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoPlayer
