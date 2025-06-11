// src/components/admin/TransactionMonitoring.js

import React, { useEffect, useState } from 'react';
import ApiService from '../../components/Service'; // adjust the path if necessary

const TransactionMonitoring = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    ApiService.fetchTransactions()
      .then(res => setTransactions(res.data))
      .catch(err => console.error('Error fetching transactions:', err));
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Book & Transaction Monitoring</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Book Title</th>
                <th>Issued Date</th>
                <th>Returned Date</th>
                <th>Status</th>
                <th>Fine</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(txn => (
                <tr key={txn.id}>
                  <td>{txn.user}</td>
                  <td>{txn.bookTitle}</td>
                  <td>{txn.issueDate}</td>
                  <td>{txn.returnDate || <span className="text-muted">Not Returned</span>}</td>
                  <td>
                    <span className={`badge px-3 py-2 ${txn.status === 'Returned' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td>
                    {txn.fine > 0 ? (
                      <span className="text-danger fw-bold">₹{txn.fine}</span>
                    ) : (
                      <span className="text-success">No Fine</span>
                    )}
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

export default TransactionMonitoring;
