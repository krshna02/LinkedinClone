import React, { useState } from 'react';
import { createPost } from '../api';

export default function CreatePost({ user }) {
  const [text, setText] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const post = await createPost(text);
    if (post._id) {
      setText('');
      window.dispatchEvent(new Event('refreshPosts'));
    } else alert(post.message || 'Error creating post');
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={`Create you post, ${user.name}?`} rows={3} style={{ width: '100%' }} />
      <button type="submit">Post</button>
    </form>
  );
}
