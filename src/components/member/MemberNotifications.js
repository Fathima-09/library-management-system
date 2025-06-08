import React, { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const MemberNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/member/notifications/${userId}`)
      .then(res => setNotifications(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Spinner animation="border" variant="primary" />;

  return (
    <div className="container mt-4">
      <h4>Notifications</h4>
      {notifications.length === 0 ? (
        <Alert variant="info">You have no notifications.</Alert>
      ) : (
        notifications.map((note, i) => (
          <Alert key={i} variant={note.type === 'overdue' ? 'danger' : 'warning'}>
            {note.message}
          </Alert>
        ))
      )}
    </div>
  );
};

export default MemberNotifications;