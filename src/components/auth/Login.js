import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Service'; // ✅ Import API service

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await api.login(email, password);
    const user = res?.data;

    if (!user || !user.id) {
      alert('Invalid credentials');
      return;
    }

    localStorage.setItem('userId', user.id);
    localStorage.setItem('userRole', user.role);
    navigate('/home');
  } catch (err) {
    console.error('Login failed:', err);
    alert('Login failed. Please check your credentials.');
  }
};


  return (
    <div className="max-w-sm bg-white shadow rounded" style={{ maxWidth: '400px' }}>
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <label className="block mb-2 p-3">
          Email:
          <input
            type="email"
            className="w-full border p-2 rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4 p-3">
          Password:
          <input
            type="password"
            className="w-full border p-2 rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-info text-white p-2 m-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-5">
        Didn't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
