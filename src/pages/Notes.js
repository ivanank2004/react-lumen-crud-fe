import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title:'', content:'' });

  const fetchNotes = async () => {
    const { data } = await api.get('/notes');
    setNotes(data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const createNote = async e => {
    e.preventDefault();
    await api.post('/notes', newNote);
    setNewNote({ title:'', content:'' });
    fetchNotes();
  };

  const deleteNote = async id => {
    await api.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div>
      <form onSubmit={createNote}>
        <input value={newNote.title} onChange={e=>setNewNote({...newNote,title:e.target.value})} placeholder="title"/>
        <textarea value={newNote.content} onChange={e=>setNewNote({...newNote,content:e.target.value})} placeholder="content"/>
        <button>Add</button>
      </form>

      <ul>
        {notes.map(n=>(
          <li key={n.id}>
            <strong>{n.title}</strong> - {n.content}
            <button onClick={()=>deleteNote(n.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
