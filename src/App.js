// src/App.js
import { useState, useEffect } from 'react';
import api from './services/api';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('login'); // login | register | notes

  // Jika token sudah ada di localStorage, langsung tampilkan Notes
  useEffect(() => {
    if (token) setView('notes');
  }, [token]);

  const handleLogout = async () => {
    try {
      await api.post('/logout');         // panggil API logout
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

      {view === 'login' && (
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

      {view === 'register' && (
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
