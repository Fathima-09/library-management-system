import React, { useEffect, useState } from 'react';
import Api from '../Service';

const BorrowingHistory = () => {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    Api.getBorrowingHistory(userId)
      .then(res => setHistory(res.data))
      .catch(err => console.error('Error fetching history:', err));
  }, [userId]);

  const today = new Date();

  const handleReturn = async (bookId) => {
    try {
      await Api.returnBook(userId, bookId);
      alert('Book returned successfully!');
      const res = await Api.getBorrowingHistory(userId);
      setHistory(res.data);
    } catch (error) {
      console.error('Error returning book:', error.response?.data || error.message);
      alert('Failed to return book: ' + (error.response?.data || error.message));
    }
  };

  const getStatus = (txn) => {
    const due = new Date(txn.dueDate);
    if (txn.returnedDate) {
      const returned = new Date(txn.returnedDate);
      return returned > due ? 'Returned Late' : 'Returned';
    }
    return due < today ? 'Overdue' : 'Due';
  };

  return (
    <div className="container mt-4">
      <h3>Borrowing History</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Book</th>
            <th>Borrowed</th>
            <th>Due</th>
            <th>Returned</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.title}</td>
              <td>{new Date(txn.borrowDate).toLocaleDateString()}</td>
              <td>{new Date(txn.dueDate).toLocaleDateString()}</td>
              <td>
                {txn.returnedDate ? (
                  new Date(txn.returnedDate).toLocaleDateString()
                ) : (
                  <>
                    —<br />
                    <button
                      className="btn btn-sm btn-primary mt-1"
                      onClick={() => handleReturn(txn.bookId)}
                    >
                      Return
                    </button>
                  </>
                )}
              </td>
              <td>{getStatus(txn)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingHistory;
