import { useEffect, useState } from 'react';
import api from '../services/api';
import EditNote from './EditNote';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editing, setEditing] = useState(null);

  const fetchNotes = async () => {
    try {
      const { data } = await api.get('/notes');
      setNotes(data);
    } catch (err) {
      console.error(err);
      alert('Gagal memuat catatan');
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  const createNote = async (e) => {
    e.preventDefault();
    try {
      await api.post('/notes', newNote);
      setNewNote({ title: '', content: '' });
      fetchNotes();
    } catch (err) {
      console.error(err);
      alert('Gagal menambah catatan');
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm('Hapus catatan ini?')) return;
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus catatan');
    }
  };

  const container = { maxWidth: 600, margin: '0 auto', fontFamily: 'Arial, sans-serif' };
  const input = { width: '100%', padding: 10, marginBottom: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 };
  const textarea = { ...input, resize: 'vertical', minHeight: 80 };
  const button = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 14 };
  const addButton = { ...button, background: '#4CAF50', color: '#fff' };
  const updateButton = { ...button, background: '#FFC107', color: '#000' };
  const deleteButton = { ...button, background: '#f44336', color: '#fff' };
  const card = { border: '1px solid #ddd', padding: 16, borderRadius: 8, marginBottom: 12, background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' };

  return (
    <div style={container}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Daftar Catatan</h2>

      <form onSubmit={createNote} style={{ marginBottom: 30 }}>
        <input style={input} value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} placeholder="Judul catatan" required />
        <textarea style={textarea} value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} placeholder="Isi catatan" required />
        <button type="submit" style={addButton}>Tambah Catatan</button>
      </form>

      {notes.map((n) => (
        <div key={n.id} style={card}>
          <h3 style={{ margin: '0 0 8px 0' }}>{n.title}</h3>
          <p style={{ whiteSpace: 'pre-line', margin: '0 0 12px 0' }}>{n.content}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={updateButton} onClick={() => setEditing(n)}>Update</button>
            <button style={deleteButton} onClick={() => deleteNote(n.id)}>Delete</button>
          </div>
        </div>
      ))}

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
