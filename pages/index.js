import { useState } from 'react';
import Router from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!res.ok) return setError(data.error || 'Login failed');
    localStorage.setItem('token', data.token);
    Router.push('/notes');
  }

  return (
    <div style={{maxWidth:600, margin:'40px auto'}}>
      <h1>Notes SaaS — Login</h1>
      <form onSubmit={submit}>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@acme.test" />
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <hr />
      <p>Test accounts (password: <code>password</code>)</p>
      <ul>
        <li>admin@acme.test</li>
        <li>user@acme.test</li>
        <li>admin@globex.test</li>
        <li>user@globex.test</li>
      </ul>
    </div>
  );
}