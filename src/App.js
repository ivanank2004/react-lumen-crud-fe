import { useState, useEffect } from 'react';
import api from './services/api';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('login'); // login | register | notes

  // cek token saat App di-load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setView('notes'); // langsung ke Notes
    }
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('token');
    setToken(null);
    setView('login');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>React + Lumen Notes</h1>

      {view === 'login' && !token && (
        <>
          <Login
            onSuccess={(newToken) => {
              localStorage.setItem('token', newToken);
              setToken(newToken);
              setView('notes');
            }}
          />
          <p>
            Belum punya akun?{' '}
            <button onClick={() => setView('register')}>Register</button>
          </p>
        </>
      )}

      {view === 'register' && !token && (
        <>
          <Register onSuccess={() => setView('login')} />
          <p>
            Sudah punya akun?{' '}
            <button onClick={() => setView('login')}>Login</button>
          </p>
        </>
      )}

      {view === 'notes' && token && (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Notes />
        </>
      )}
    </div>
  );
}
