// src/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Home = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    navigate('/dashboard'); // Navigate to dashboard on successful login
  };

  const handleRegister = () => {
    navigate('/dashboard'); // Navigate to dashboard on successful registration
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h1>
        {isLogin ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Register onRegister={handleRegister} />
        )}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? 'Need an account? Register here' : 'Already have an account? Login here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
