import { Link } from 'react-router-dom';
import { getMediaUrl } from '../api/client';

function VideoCard({ video }) {
  return (
    <Link className="video-card" to={`/watch/${video._id}`}>
      <img src={getMediaUrl(video.thumbnailUrl)} alt={video.title} className="thumb" />
      <h3>{video.title}</h3>
      <p>{video.user?.name || 'Unknown channel'}</p>
    </Link>
  );
}

export default VideoCard;
