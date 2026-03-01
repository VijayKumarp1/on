const API_URL = import.meta.env.VITE_API_URL;

export const getMediaUrl = (url) => `${API_URL}${url}`;

export const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {})
    }
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Request failed');

  return data;
};
