const API = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export async function register(name, email, password) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function getPosts() {
  const res = await fetch(`${API}/posts`);
  return res.json();
}

export async function createPost(text) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ text })
  });
  return res.json();
}

export async function toggleLike(postId) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/posts/${postId}/like`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}
