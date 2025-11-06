import React, { useState } from 'react';
import { register } from '../api';

export default function Signup({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    const res = await register(name, email, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
    } else alert(res.message || 'Error');
  }

  return (
    <form onSubmit={submit} style={{ flex: 1, border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      <h3>Sign up</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <br />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <br />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}
