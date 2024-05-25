import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../styles/GradientBackground';
import '../App.css';

const Links = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/more-about-us" className="nav-link">More About Us</Link>
        <Link to="/info-about-project" className="nav-link">Info About the Project</Link>
        <Link to="/links" className="nav-link">Links</Link>
        <Link to="/login" className="nav-link" style={{ marginLeft: 'auto' }}>Login</Link>
      </nav>
      <Container className="container">
        <h1>Links</h1>
        <a href="https://vercel.com/hugocis-projects/co-fuel" target="_blank" rel="noopener noreferrer" className="link">Deployment on Vercel</a>
        <a href="https://github.com/hugocis/CoFuel" target="_blank" rel="noopener noreferrer" className="link">GitHub Repository</a>
      </Container>
      <footer className="footer">
        <p>&copy; 2024 Cofuel. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Links;
