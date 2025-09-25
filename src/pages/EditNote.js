import { useState } from 'react';
import api from '../services/api';

export default function EditNote({ note, onSuccess, onCancel }) {
  const [form, setForm] = useState({ title: note.title, content: note.content });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/notes/${note.id}`, form);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert('Gagal update catatan');
    }
  };

  const formStyle = { border: '1px solid #ccc', padding: 16, borderRadius: 8, background: '#f9f9f9', marginBottom: 20 };
  const input = { width: '100%', padding: 10, marginBottom: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 };
  const textarea = { ...input, minHeight: 80, resize: 'vertical' };
  const button = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 14 };
  const saveButton = { ...button, background: '#4CAF50', color: '#fff' };
  const cancelButton = { ...button, background: '#f44336', color: '#fff', marginLeft: 8 };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={{ marginTop: 0 }}>Edit Catatan</h3>
      <input style={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Judul" required />
      <textarea style={textarea} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Isi catatan" required />
      <div>
        <button type="submit" style={saveButton}>Simpan</button>
        <button type="button" style={cancelButton} onClick={onCancel}>Batal</button>
      </div>
    </form>
  );
}
