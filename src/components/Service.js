// src/components/Service.js OR src/services/Service.js

import axios from 'axios';

const ADMIN_URL = 'http://localhost:8080/api/admin';

class ApiService {
  //  Fetch all users
  static fetchUsers() {
    return axios.get(`${ADMIN_URL}/users`);
  }

  // Update a user’s role
  static updateUserRole(userId, newRole) {
    return axios.put(`${ADMIN_URL}/users/${userId}/role`, newRole, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Fetch all book transactions
  static fetchTransactions() {
    return axios.get(`${ADMIN_URL}/book-monitoring`);
  }
}

export default ApiService;
