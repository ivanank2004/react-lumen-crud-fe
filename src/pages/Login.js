// src/pages/Login.js
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

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit" style={{ padding: 6 }}>Login</button>
    </form>
  );
}
