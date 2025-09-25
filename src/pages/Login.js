import { useState } from 'react';
import api from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });

  const submit = async e => {
    e.preventDefault();
    const { data } = await api.post('/login', form);
    localStorage.setItem('token', data.token); // simpan token
    alert('Login sukses');
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="username" onChange={e => setForm({...form, username:e.target.value})}/>
      <input type="password" placeholder="password" onChange={e => setForm({...form, password:e.target.value})}/>
      <button>Login</button>
    </form>
  );
}
