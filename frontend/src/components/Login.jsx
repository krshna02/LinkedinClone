import React, { useState } from 'react';
import { login } from '../api';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    const res = await login(email, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
    } else alert(res.message || 'Login failed');
  }

  return (
    <form onSubmit={submit} style={{ flex: 1, border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      <h3>Login</h3>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <br />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
