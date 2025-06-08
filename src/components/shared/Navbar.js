import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/">📚 Library System</Navbar.Brand>
        <Navbar.Toggle aria-controls="library-navbar" />
        <Navbar.Collapse id="library-navbar">
          <Nav className="ms-auto">
            {/* Auth Links */}
            <Nav.Link as={Link} to="/">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>

            {/* Librarian Section */}
            <NavDropdown title="Librarian" id="librarian-nav">
              <NavDropdown.Item as={Link} to="/librarian/book-management">Books</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/librarian/issue-return">Issue/Return</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/librarian/reports">Reports</NavDropdown.Item>
            </NavDropdown>

            {/* Admin Section */}
            <NavDropdown title="Admin" id="admin-nav">
              <NavDropdown.Item as={Link} to="/admin/user-role">User Roles</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/book-monitoring">Monitoring</NavDropdown.Item>

            </NavDropdown>

            {/* Member Section */}
            <NavDropdown title="Member" id="member-nav">
              <NavDropdown.Item as={Link} to="/member/search-borrow">Search</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/member/borrow-history">History</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/member/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/member/notifications">Notifications</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;