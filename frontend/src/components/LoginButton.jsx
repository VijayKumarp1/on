import { useEffect, useRef } from 'react';
import { request } from '../api/client';

function LoginButton({ onSuccess }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.google || !ref.current) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          const data = await request('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential })
          });

          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          onSuccess(data);
        } catch (error) {
          alert(error.message);
        }
      }
    });

    window.google.accounts.id.renderButton(ref.current, {
      theme: 'outline',
      size: 'medium'
    });
  }, [onSuccess]);

  return <div ref={ref} />;
}

export default LoginButton;
