import { useState } from 'react';
import api from '../services/api';

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/login', form);
      if (onSuccess) onSuccess(data.token);
    } catch (err) {
      alert('Login gagal');
      console.error(err);
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
    background: '#4CAF50',
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
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        style={inputStyle}
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button
        type="submit"
        style={btnStyle}
        onMouseEnter={e => e.currentTarget.style.opacity = 0.8}
        onMouseLeave={e => e.currentTarget.style.opacity = 1}
      >
        Login
      </button>
    </form>
  );
}
