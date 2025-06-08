import React, { useEffect, useState } from 'react';
import Api from '../Service'; // Make sure you have this

const BookSearchBorrow = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    Api.getAvailableBooks()
      .then((res) => {
        if (searchTerm.trim()) {
          const filtered = res.data.filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setBooks(filtered);
        } else {
          setBooks(res.data);
        }
      })
      .catch((err) => console.error('Error fetching books:', err));
  }, [searchTerm]);

  const handleBorrow = (bookId) => {
    Api.borrowBook(userId, bookId)
      .then((res) => {
        alert(res.data);
        // Refresh book list to update availability
        return Api.getAvailableBooks();
      })
      .then((res) => setBooks(res.data))
      .catch(() => alert('Borrow failed'));
  };

  return (
    <div className="container mt-4">
      <h3>Search & Borrow Books</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {books.map((book) => (
        <div key={book.id} className="border p-3 d-flex justify-content-between mb-2">
          <div>
            <strong>{book.title}</strong>
            <div className="text-muted">by {book.author}</div>
          </div>
          {book.available ? (
            <button onClick={() => handleBorrow(book.id)} className="btn btn-primary">
              Borrow
            </button>
          ) : (
            <span className="text-danger">Not Available</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookSearchBorrow;
