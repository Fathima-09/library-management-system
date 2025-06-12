import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/member';
const ADMIN_URL = 'http://localhost:8080/api/admin';

const AUTH_URL = 'http://localhost:8080/api/auth'; // Used for auth operations like login, register, otp
const API_BASE_URL = 'http://localhost:8080/api/librarian'; // Update if backend runs elsewhere

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

 // 8. Login (POST /api/auth/login)
  static login(email, password) {
    return axios.post(`${AUTH_URL}/login`, { email, password });
  }

  // 9. Register (POST /api/auth/register)
  static register(email, password, role) {
    return axios.post(`${AUTH_URL}/register`, { email, password, role });
  }

  // 10. Send OTP (POST /api/auth/send-otp)
  static sendOtp(email) {
    return axios.post(`${AUTH_URL}/send-otp`, { email });
  }

  // 11. Verify OTP (POST /api/auth/verify-otp)
  static verifyOtp(email, otp) {
    return axios.post(`${AUTH_URL}/verify-otp`, { email, otp });
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

  
  // BOOK APIs
  static getAvailableBooks() {
    return axios.get(`${API_BASE_URL}/books`);
  }

  static addBook(book) {
    return axios.post(`${API_BASE_URL}/books`, book);
  }

  static updateBook(id, book) {
    return axios.put(`${API_BASE_URL}/books/${id}`, book);
  }

  static deleteBook(id) {
    return axios.delete(`${API_BASE_URL}/books/${id}`);
  }

  static updateBookAvailability(id, available) {
    return axios.put(`${API_BASE_URL}/books/${id}/availability`, { available });
  }

  // USER APIs
  static fetchUsers() {
    return axios.get(`${API_BASE_URL}/users`);
  }

  // TRANSACTION APIs
  static fetchTransactions() {
    return axios.get(`${API_BASE_URL}/transactions`);
  }

  static addTransaction(transaction) {
    return axios.post(`${API_BASE_URL}/transactions`, transaction);
  }

  
  
}
  

export default Api;