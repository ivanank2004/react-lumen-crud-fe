import { useState } from 'react';
import api from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const submit = async e => {
    e.preventDefault();
    await api.post('/register', form);
    alert('Register sukses, silakan login');
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="username" onChange={e => setForm({...form, username:e.target.value})}/>
      <input placeholder="email" onChange={e => setForm({...form, email:e.target.value})}/>
      <input type="password" placeholder="password" onChange={e => setForm({...form, password:e.target.value})}/>
      <button>Register</button>
    </form>
  );
}
