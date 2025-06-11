import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Table, Badge } from 'react-bootstrap';
import { fetchBooks, fetchTransactions, addTransaction } from '../service/LibraryService';  // <-- Correct path and destructured imports

const IssueReturnSystem = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [latestTransaction, setLatestTransaction] = useState(null);

  // Load books and users on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);

        // Assuming your backend has an endpoint for users or you hardcode users here:
        // If backend doesn't have users endpoint, just hardcode users:
        setUsers([
          { id: 1, name: 'Alice Smith' },
          { id: 2, name: 'Bob Johnson' },
        ]);

        const transactionsData = await fetchTransactions();
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const handleIssue = async () => {
    const book = books.find(b => b.id === parseInt(selectedBookId));
    if (!book || !book.available || !selectedUserId) return;

    const user = users.find(u => u.id === parseInt(selectedUserId));
    if (!user) return;

    const transaction = {
      bookTitle: book.title,
      userName: user.name,
      date: new Date().toISOString(),
      type: 'Issued',
    };

    try {
      // Add transaction via API
      const addedTx = await addTransaction(transaction);

      // Update local state
      setBooks(prev =>
        prev.map(b => (b.id === book.id ? { ...b, available: false } : b))
      );
      setTransactions(prev => [...prev, addedTx]);
      setLatestTransaction(addedTx);
      setSelectedBookId('');
      setSelectedUserId('');
    } catch (error) {
      console.error('Error issuing book:', error);
    }
  };

  const handleReturn = async () => {
    const book = books.find(b => b.id === parseInt(selectedBookId));
    if (!book || book.available || !selectedUserId) return;

    const user = users.find(u => u.id === parseInt(selectedUserId));
    if (!user) return;

    const transaction = {
      bookTitle: book.title,
      userName: user.name,
      date: new Date().toISOString(),
      type: 'Returned',
    };

    try {
      // Add transaction via API
      const addedTx = await addTransaction(transaction);

      // Update local state
      setBooks(prev =>
        prev.map(b => (b.id === book.id ? { ...b, available: true } : b))
      );
      setTransactions(prev => [...prev, addedTx]);
      setLatestTransaction(addedTx);
      setSelectedBookId('');
      setSelectedUserId('');
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  useEffect(() => {
    if (latestTransaction) {
      alert(`Book ${latestTransaction.type.toLowerCase()} successfully!`);
    }
  }, [latestTransaction]);

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Issue / Return Book</h3>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Select
                value={selectedBookId}
                onChange={(e) => setSelectedBookId(e.target.value)}
              >
                <option value="">Select Book</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} ({book.available ? 'Available' : 'Issued'})
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <div className="text-center mb-4">
            <Button variant="success" className="me-3" onClick={handleIssue}>
              Issue Book
            </Button>
            <Button variant="warning" onClick={handleReturn}>
              Return Book
            </Button>
          </div>

          <h5 className="mb-3">Transaction History</h5>
          <Table bordered hover size="sm" responsive>
            <thead className="table-light">
              <tr>
                <th>Book</th>
                <th>User</th>
                <th>Date</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.bookTitle}</td>
                  <td>{tx.userName}</td>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td>
                    <Badge bg={tx.type === 'Issued' ? 'primary' : 'secondary'}>
                      {tx.type}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default IssueReturnSystem;
