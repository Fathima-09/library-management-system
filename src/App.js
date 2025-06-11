import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Shared Components
import Navbar from './components/shared/Navbar';
import ProtectedRoute from './components/ProtectedRoute';


// Admin Module
import UserManagement from './components/admin/UserManagement';
import BookTransactionMonitoring from './components/admin/TransactionMonitoring';



// Member Module
import BookSearchBorrow from './components/member/BookSearchBorrow';
import BorrowingHistory from './components/member/BorrowingHistory';
import MemberProfile from './components/member/MemberProfile';
import MemberNotifications from './components/member/MemberNotifications';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>

           {/* Home */}
          <Route path="/home" element={
            <ProtectedRoute allowedRoles={['admin', 'librarian', 'member']}>
            <Home />
             </ProtectedRoute> }/>

         
          {/* Member Routes */}
          <Route
            path="/member/search-borrow"
            element={
              <ProtectedRoute allowedRoles={['member']}>
                <BookSearchBorrow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/member/borrow-history"
            element={
              <ProtectedRoute allowedRoles={['member']}>
                <BorrowingHistory />
              </ProtectedRoute>
            }
          />
           
          <Route
            path="/member/profile"
            element={
              <ProtectedRoute allowedRoles={['member']}>
                <MemberProfile />
              </ProtectedRoute>
            }
          />
          <Route
  path="/member/notifications"
  element={
    <ProtectedRoute allowedRoles={['member']}>
      <MemberNotifications />
    </ProtectedRoute>
  }
/>

{/* Admin Routes */}
          <Route
            path="/admin/user-role"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/book-monitoring"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <BookTransactionMonitoring />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/book-management"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <BookManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/issue-return"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <IssueReturnSystem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <TransactionReports />
              </ProtectedRoute>
            }
          />

           </Routes>
           </div>
    </Router>
  );
}

export default App;