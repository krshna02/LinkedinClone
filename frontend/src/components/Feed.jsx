import React, { useEffect, useState } from 'react';
import { getPosts, toggleLike } from '../api';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  async function load() {
    const data = await getPosts();
    setPosts(data || []);
  }

  useEffect(() => {
    load();
    const h = () => load();
    window.addEventListener('refreshPosts', h);
    return () => window.removeEventListener('refreshPosts', h);
  }, []);

  async function like(id) {
    await toggleLike(id);
    load();
  }

  
    return (
  <div>
    <h3 style={{ color: '#0a66c2', marginBottom: '16px' }}>Public Feed</h3>
    <div className="feed-container">
      {posts.length === 0 && <div>No posts yet</div>}
      {posts.map((p) => (
        <div key={p._id} className="post-card">
          <div className="post-header">
            <div className="post-author">{p.author?.name || 'Unknown'}</div>
            <div className="post-date">
              {new Date(p.createdAt).toLocaleString()}
            </div>
          </div>
          <p className="post-text">{p.text}</p>
          <button className="like-btn" onClick={() => like(p._id)}>
            👍 Like ({(p.likes || []).length})
          </button>
        </div>
      ))}
    </div>
  </div>
);
}
