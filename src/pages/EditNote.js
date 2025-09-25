import { useState } from 'react';
import api from '../services/api';

export default function EditNote({ note, onSuccess, onCancel }) {
  // isi awal dari note yang mau diedit
  const [form, setForm] = useState({
    title: note.title,
    content: note.content,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/notes/${note.id}`, form); // API Update
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert('Gagal update note');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <h3>Edit Note</h3>
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Judul"
      />
      <br />
      <textarea
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        placeholder="Isi catatan"
        rows={4}
        cols={40}
      />
      <br />
      <button type="submit">Simpan</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
        Batal
      </button>
    </form>
  );
}
