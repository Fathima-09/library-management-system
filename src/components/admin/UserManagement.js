// src/components/admin/UserManagement.js

import React, { useEffect, useState } from 'react';
import Api from '../../components/Service'; // adjust if you moved the file

const roles = ['Member', 'Librarian', 'Admin'];

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Api.fetchUsers()
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleSave = async (user) => {
    try {
      await Api.updateUserRole(user.id, user.role);
      alert('User role updated successfully!');
    } catch (err) {
      console.error('Error updating user role:', err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">User Role Management</h2>
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      className="form-select"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleSave(user)}>
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
