import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/member';
const ADMIN_URL = 'http://localhost:8080/api/admin';


class Api {
  // 1. Get all available books
  static getAvailableBooks() {
    return axios.get(`${BASE_URL}/books`);
  }

  // 2. Borrow a book
  static borrowBook(userId, bookId) {
    return axios.post(`${BASE_URL}/borrow`, null, {
      params: { userId, bookId },
    });
  }

  // 3. Get borrowing history
  static getBorrowingHistory(userId) {
    return axios.get(`${BASE_URL}/history/${userId}`);
  }

  // 4. Get member profile
  static getProfile(userId) {
    return axios.get(`${BASE_URL}/profile/${userId}`);
  }

  // 5. Update member profile
  static updateProfile(userId, data) {
    return axios.put(`${BASE_URL}/profile/${userId}`, data);
  }

  // 6. Get notifications
  static getNotifications(userId) {
    return axios.get(`${BASE_URL}/notifications/${userId}`);
  }

  //7. Return a book
  static returnBook(userId, bookId) {
  return axios.post(`${BASE_URL}/history/return`, null, {
    params: { userId, bookId },
  });
 }
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
  

export default Api;