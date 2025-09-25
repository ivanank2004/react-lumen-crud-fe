import { useState, useEffect } from 'react';
import api from './services/api';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('login');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setView('notes');
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

  const container = { maxWidth: 600, margin: '0 auto', padding: 20, fontFamily: 'Arial, sans-serif' };
  const logoutBtn = {
    padding: '8px 16px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    background: '#f44336',
    color: '#fff',
    marginBottom: 20,
    transition: 'all 0.2s',
  };

  return (
    <div style={container}>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>React + Lumen Notes</h1>

      {view === 'login' && !token && (
        <>
          <Login
            onSuccess={(newToken) => {
              localStorage.setItem('token', newToken);
              setToken(newToken);
              setView('notes');
            }}
          />
          <p style={{ textAlign: 'center', marginTop: 10 }}>
            Belum punya akun?{' '}
            <button
              style={{ ...logoutBtn, background: '#4CAF50' }}
              onClick={() => setView('register')}
            >
              Register
            </button>
          </p>
        </>
      )}

      {view === 'register' && !token && (
        <>
          <Register onSuccess={() => setView('login')} />
          <p style={{ textAlign: 'center', marginTop: 10 }}>
            Sudah punya akun?{' '}
            <button
              style={{ ...logoutBtn, background: '#2196F3' }}
              onClick={() => setView('login')}
            >
              Login
            </button>
          </p>
        </>
      )}

      {view === 'notes' && token && (
        <>
          <button
            style={logoutBtn}
            onClick={handleLogout}
            onMouseEnter={e => e.currentTarget.style.opacity = 0.8}
            onMouseLeave={e => e.currentTarget.style.opacity = 1}
          >
            Logout
          </button>
          <Notes />
        </>
      )}
    </div>
  );
}
