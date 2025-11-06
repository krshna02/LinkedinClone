import React from 'react';

export default function Navbar({ user, setUser }) {
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }
  return (
   <nav>
  <div className="logo">LinkedIn Clone</div>
  <div>
    {user ? (
      <>
        <span style={{ marginRight: 12 }}>Hi, {user.name}</span>
        <button onClick={logout}>Logout</button>
      </>
    ) : (
      <span>Not signed in</span>
    )}
  </div>
</nav>

  );
}
