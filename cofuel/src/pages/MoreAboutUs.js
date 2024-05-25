import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../styles/GradientBackground';
import '../App.css';

const MoreAboutUs = () => {
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
        <h1>More About Us</h1>
        <div className="team">
          <div className="team-member">
            <h2>Hugo Cisneros</h2>
          </div>
          <div className="team-member">
            <h2>Javier de Santos</h2>
          </div>
          <div className="team-member">
            <h2>Alicia García</h2>
          </div>
          <div className="team-member">
            <h2>Estelle Pamen</h2>
          </div>
          <div className="team-member">
            <h2>Fernando Teba</h2>
          </div>
        </div>
      </Container>
      <footer className="footer">
        <p>&copy; 2024 Cofuel. All rights reserved.</p>
      </footer>
    </>
  );
};

export default MoreAboutUs;
