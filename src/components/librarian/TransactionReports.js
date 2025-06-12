import React, { useState, useEffect } from 'react';
import { Container, Row, ButtonGroup, Button, Table, Badge } from 'react-bootstrap';
import { fetchTransactions } from '../service/LibraryService';  // Make sure path is correct

const TransactionReports = () => {
  const [filter, setFilter] = useState('daily');
  const [transactions, setTransactions] = useState([]);
  const now = new Date();

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to load transactions:', error);
      }
    };
    loadTransactions();
  }, []);

  const getFilteredTransactions = () => {
    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);
      if (filter === 'daily') {
        return txDate.toDateString() === now.toDateString();
      }
      if (filter === 'weekly') {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return txDate >= oneWeekAgo && txDate <= now;
      }
      if (filter === 'monthly') {
        return (
          txDate.getMonth() === now.getMonth() &&
          txDate.getFullYear() === now.getFullYear()
        );
      }
      return false;
    });
  };

  const filtered = getFilteredTransactions();

  return (
    <Container className="mt-5 p-4 bg-light rounded shadow">
      <h2 className="text-center mb-4">Transaction Reports</h2>

      <Row className="justify-content-center mb-4">
        <ButtonGroup>
          {['daily', 'weekly', 'monthly'].map((option) => (
            <Button
              key={option}
              variant={filter === option ? 'primary' : 'outline-secondary'}
              onClick={() => setFilter(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </Row>

      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>Book</th>
            <th>User</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((tx) => (
              <tr key={tx.id} className="text-center">
                <td>{tx.bookTitle}</td>
                <td>{tx.userName}</td>
                <td>
                  <Badge bg={tx.type === 'Issued' ? 'success' : 'secondary'}>
                    {tx.type}
                  </Badge>
                </td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-3">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default TransactionReports;
