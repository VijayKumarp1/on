import { Link, Route, Routes } from 'react-router-dom';
import { useMemo, useState } from 'react';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import UploadPage from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';
import LoginButton from './components/LoginButton';

function App() {
  const [session, setSession] = useState(() => {
    const token = localStorage.getItem('token');
    const userRaw = localStorage.getItem('user');
    return token && userRaw ? { token, user: JSON.parse(userRaw) } : null;
  });

  const context = useMemo(() => ({ session, setSession }), [session]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setSession(null);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/">Bite</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <div className="auth-slot">
          {session ? (
            <button className="secondary" onClick={logout}>Logout</button>
          ) : (
            <LoginButton onSuccess={setSession} />
          )}
        </div>
      </header>

      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/watch/:id" element={<WatchPage session={session} />} />
          <Route path="/upload" element={<UploadPage session={session} />} />
          <Route path="/profile" element={<ProfilePage appContext={context} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
