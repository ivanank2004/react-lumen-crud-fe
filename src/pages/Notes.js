import { useEffect, useState } from 'react';
import api from '../services/api';
import EditNote from './EditNote';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editing, setEditing] = useState(null); // note yang sedang di-edit

  const fetchNotes = async () => {
    const { data } = await api.get('/notes');
    setNotes(data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const createNote = async (e) => {
    e.preventDefault();
    await api.post('/notes', newNote);
    setNewNote({ title: '', content: '' });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Daftar Catatan</h2>

      {/* Form tambah catatan */}
      <form onSubmit={createNote} style={{ marginBottom: 20 }}>
        <input
          style={{ width: '100%', marginBottom: 8, padding: 6 }}
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          placeholder="Judul catatan"
          required
        />
        <textarea
          style={{ width: '100%', marginBottom: 8, padding: 6 }}
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          placeholder="Isi catatan"
          rows={4}
          required
        />
        <button type="submit" style={{ padding: '6px 12px' }}>Tambah</button>
      </form>

      {/* Daftar catatan */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes.map((n) => (
          <li
            key={n.id}
            style={{
              border: '1px solid #ccc',
              padding: 10,
              marginBottom: 10,
              borderRadius: 6,
              background: '#fafafa',
            }}
          >
            <strong>{n.title}</strong>
            <p style={{ whiteSpace: 'pre-line' }}>{n.content}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setEditing(n)}>Update</button>
              <button onClick={() => deleteNote(n.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Form edit muncul jika editing != null */}
      {editing && (
        <EditNote
          note={editing}
          onSuccess={() => {
            setEditing(null);
            fetchNotes();
          }}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
}
