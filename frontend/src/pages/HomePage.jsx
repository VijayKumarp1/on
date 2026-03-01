import { useEffect, useState } from 'react';
import { request } from '../api/client';
import VideoCard from '../components/VideoCard';

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    request('/api/videos')
      .then(setVideos)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h1>Discover videos</h1>
      {error && <p className="error">{error}</p>}
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
