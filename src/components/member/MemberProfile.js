import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Image } from 'react-bootstrap';
import Api from '../Service';

const MemberProfile = () => {
  const userId = localStorage.getItem("userId");

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePic: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  useEffect(() => {
    Api.getProfile(userId)
      .then(res => {
        setProfile(res.data);
        setTempProfile(res.data);
      })
      .catch(err => console.error('Error loading profile:', err));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // NOTE: This is just for preview — backend doesn’t yet store images
      setTempProfile(prev => ({
        ...prev,
        profilePic: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = () => {
    Api.updateProfile(userId, tempProfile)
      .then(res => {
        setProfile(res.data);
        setTempProfile(res.data);
        setEditMode(false);
        alert('Profile updated successfully!');
      })
      .catch(() => alert('Failed to update profile'));
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setEditMode(false);
  };

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Member Profile</h3>

          <div className="text-center mb-4">
            <Image
              src={tempProfile.profilePic || '/default-profile.png'}
              roundedCircle
              width="120"
              height="120"
              style={{ objectFit: 'cover', border: '3px solid #0d6efd' }}
              alt="Profile"
            />
            {editMode && (
              <Form.Group controlId="formFile" className="mt-2">
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              </Form.Group>
            )}
          </div>

          <Form>
            <Row className="mb-3">
              {['name', 'email', 'phone', 'address'].map((field) => (
                <Form.Group as={Col} md={12} key={field} className="mb-3">
                  <Form.Label className="text-capitalize">{field}</Form.Label>
                  <Form.Control
                    type="text"
                    name={field}
                    value={tempProfile[field]}
                    onChange={handleChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
              ))}
            </Row>

            <div className="d-flex justify-content-center gap-3 mt-4">
              {!editMode ? (
                <Button variant="primary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="success" onClick={handleSave}>
                    Save
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MemberProfile;
