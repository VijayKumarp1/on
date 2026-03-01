import { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import { request } from '../api/client';

function ProfilePage({ appContext }) {
  const { session } = appContext;
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session?.token) return;

    request('/api/videos/me', {
      headers: { Authorization: `Bearer ${session.token}` }
    })
      .then(setVideos)
      .catch((err) => setError(err.message));
  }, [session]);

  if (!session) return <p>Please login to view your profile.</p>;

  return (
    <section>
      <h1>{session.user.name}</h1>
      <p className="muted">{session.user.email}</p>
      {error && <p className="error">{error}</p>}
      <h2>Your uploads</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </section>
  );
}

export default ProfilePage;
