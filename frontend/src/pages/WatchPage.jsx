import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaUrl, request } from '../api/client';

function WatchPage({ session }) {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    request(`/api/videos/${id}`)
      .then(setVideo)
      .catch((err) => setError(err.message));

    request(`/api/videos/${id}/comments`)
      .then(setComments)
      .catch((err) => setError(err.message));
  }, [id]);

  const submitComment = async (event) => {
    event.preventDefault();
    if (!session?.token) return alert('Login required');

    try {
      const comment = await request(`/api/videos/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`
        },
        body: JSON.stringify({ text })
      });
      setComments((prev) => [comment, ...prev]);
      setText('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!video) return <p>{error || 'Loading...'}</p>;

  return (
    <section className="watch-layout">
      <video src={getMediaUrl(video.videoUrl)} controls className="player" />
      <h1>{video.title}</h1>
      <p className="muted">By {video.user?.name}</p>
      <p>{video.description}</p>

      <div className="comment-box">
        <h2>Comments</h2>
        <form onSubmit={submitComment}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment"
            required
          />
          <button type="submit">Post comment</button>
        </form>

        {comments.map((comment) => (
          <article key={comment._id} className="comment-item">
            <strong>{comment.user?.name}</strong>
            <p>{comment.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WatchPage;
