// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Save token in localStorage
      navigate('/dashboard'); // Redirect to the dashboard after successful login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mt-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
