import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Service'; // ✅ Import API service

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Member',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.register(formData.email, formData.password, formData.role);
      navigate('/verify-email');
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start vh-100">
      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Library Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Member">Member</option>
              <option value="Librarian">Librarian</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
