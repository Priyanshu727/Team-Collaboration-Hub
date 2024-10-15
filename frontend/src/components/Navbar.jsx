import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); // Get the current location

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage on logout
    window.location.href = '/'; // Redirect to the home page after logout
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Team Collaboration Hub
        </Link>
        <div>
          {location.pathname !== '/' && ( // Hide menu on home page
            <>
              <Link to="/" className="text-white mx-2">
                Dashboard
              </Link>
              <Link to="/create-task" className="text-white mx-2">
                Create Task
              </Link>
              <Link to="/chat" className="text-white mx-2">
                Chat
              </Link>
            </>
          )}
          <button onClick={handleLogout} className="text-white mx-2">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
