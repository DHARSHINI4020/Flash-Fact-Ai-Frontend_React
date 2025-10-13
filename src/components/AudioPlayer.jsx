function AudioPlayer({ src, title }) {
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <audio controls className="w-full">
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default AudioPlayer
