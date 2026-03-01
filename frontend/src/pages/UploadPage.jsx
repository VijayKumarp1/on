import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../api/client';

function UploadPage({ session }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!session?.token) {
      return setError('Please login first');
    }

    if (!video || !thumbnail) {
      return setError('Video and thumbnail are required');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', video);
    formData.append('thumbnail', thumbnail);

    try {
      await request('/api/videos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.token}`
        },
        body: formData
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <h1>Upload a video</h1>
      {error && <p className="error">{error}</p>}
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={120}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={2000}
        />
        <label>
          Video file
          <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files?.[0])} required />
        </label>
        <label>
          Thumbnail image
          <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0])} required />
        </label>
        <button type="submit">Upload</button>
      </form>
    </section>
  );
}

export default UploadPage;
