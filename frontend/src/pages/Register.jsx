// src/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role set to User
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    setSuccess(''); // Clear previous success message

    try {
      const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }), // Include role in the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      setSuccess('Registration successful! Please log in.'); // Set success message
      console.log('User registered:', data);

      // Redirect to login page after a short delay to show success message
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful registration
      }, 2000);
    } catch (error) {
      setError(error.message); // Set error message to display
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mt-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
          required
        />
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
          required
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4">
          Register
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>} {/* Error message display */}
      {success && <p className="mt-4 text-green-500">{success}</p>} {/* Success message display */}
    </div>
  );
};

export default Register;
