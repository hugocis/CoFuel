import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../styles/GradientBackground';
import '../App.css';

const Home = () => {
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
        <h1 className="title">WHERE EVERY TRIP COUNTS <span className="title-green">COFUEL</span></h1>
        <Link to="/create-account" className="button">Join the revolution</Link>
      </Container>
      <footer className="footer">
        <p>&copy; 2024 Cofuel. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
