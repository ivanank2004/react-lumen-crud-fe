// src/pages/Register.js
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
      alert('Register gagal');
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
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit" style={{ padding: 6 }}>Register</button>
    </form>
  );
}
