import { useEffect, useState } from 'react';
import api from './services/api';

export default function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/').then(res => setMsg(res.data.message));
  }, []);

  return <h1>{msg}</h1>;
}
