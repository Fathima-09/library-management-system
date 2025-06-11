import React, { useState, useEffect } from 'react';
import { fetchBooks, addBook, updateBook, deleteBook } from '../service/LibraryService';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [editBookId, setEditBookId] = useState(null);
  const [editBookTitle, setEditBookTitle] = useState('');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  const handleAddBook = async () => {
    if (!newBookTitle.trim()) return;
    try {
      await addBook({ title: newBookTitle, available: true });
      setNewBookTitle('');
      loadBooks();
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  const handleEditBook = (book) => {
    setEditBookId(book.id);
    setEditBookTitle(book.title);
  };

  const handleUpdateBook = async () => {
    if (!editBookTitle.trim()) return;
    try {
      await updateBook(editBookId, { title: editBookTitle });
      setEditBookId(null);
      setEditBookTitle('');
      loadBooks();
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      loadBooks();
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h3>Book Management</h3>
      <Form>
        <Row>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Enter new book title"
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Button onClick={handleAddBook} variant="primary">
              Add Book
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) =>
            editBookId === book.id ? (
              <tr key={book.id}>
                <td>
                  <Form.Control
                    value={editBookTitle}
                    onChange={(e) => setEditBookTitle(e.target.value)}
                  />
                </td>
                <td>{book.available ? 'Yes' : 'No'}</td>
                <td>
                  <Button variant="success" onClick={handleUpdateBook} size="sm">
                    Save
                  </Button>{' '}
                  <Button variant="secondary" onClick={() => setEditBookId(null)} size="sm">
                    Cancel
                  </Button>
                </td>
              </tr>
            ) : (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.available ? 'Yes' : 'No'}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEditBook(book)} size="sm">
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteBook(book.id)} size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default BookManagement;
