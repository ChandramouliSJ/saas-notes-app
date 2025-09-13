import { useEffect, useState } from 'react';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [tenantPlan, setTenantPlan] = useState('');

  async function fetchNotes() {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/notes', { headers: { Authorization: 'Bearer ' + token } });
    const data = await res.json();
    if (res.ok) {
      setNotes(data.notes);
    }
  }

  async function createNote(e) {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    const res = await fetch('/api/notes', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify({ title, body }) });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Failed');
    } else {
      setTitle(''); setBody(''); fetchNotes();
    }
  }

  async function deleteNote(id) {
    const token = localStorage.getItem('token');
    await fetch('/api/notes/' + id, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } });
    fetchNotes();
  }

  useEffect(() => { fetchNotes(); }, []);

  return (
    <div style={{maxWidth:600, margin:'40px auto'}}>
      <h1>Notes</h1>
      <form onSubmit={createNote}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
        <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Body" />
        <button type="submit">Add Note</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {notes.map(n=>(
          <li key={n.id}>
            <b>{n.title}</b> - {n.body} <button onClick={()=>deleteNote(n.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}