import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-4 footer">
      <Container fluid className="py-3">
        <p className="text-center mb-0">
          © 2024 My Website, Inc.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
