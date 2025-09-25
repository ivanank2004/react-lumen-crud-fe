import { useState } from 'react';
import api from '../services/api';

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', form);
      alert('Register sukses, silakan login');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert('Gagal register');
    }
  };

  const inputStyle = {
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16,
    width: '100%',
  };
  const btnStyle = {
    padding: 10,
    borderRadius: 6,
    border: 'none',
    background: '#2196F3',
    color: '#fff',
    fontSize: 16,
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  return (
    <form
      onSubmit={submit}
      style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}
    >
      <input
        style={inputStyle}
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        style={inputStyle}
        placeholder="Email"
        type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        style={inputStyle}
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button
        type="submit"
        style={btnStyle}
        onMouseEnter={e => e.currentTarget.style.opacity = 0.8}
        onMouseLeave={e => e.currentTarget.style.opacity = 1}
      >
        Register
      </button>
    </form>
  );
}
