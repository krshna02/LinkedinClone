import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import Feed from './components/Feed';

function App() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  useEffect(() => {
    // keep user synced (in case user data stored)
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <main style={{ maxWidth: 800, margin: '20px auto', padding: '0 16px' }}>
        {!user ? (
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <Signup setUser={setUser} />
            <Login setUser={setUser} />
          </div>
        ) : (
          <>
            <CreatePost user={user} />
            <Feed user={user} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
