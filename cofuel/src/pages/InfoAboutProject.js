import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../styles/GradientBackground';
import '../App.css';

const InfoAboutProject = () => {
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
        <h1>Info About the Project</h1>
        <p>The CoFuel project aims to revolutionize carpooling by making every trip count. Our platform connects drivers and passengers, enabling them to share rides, reduce costs, and contribute to a greener environment. We believe in sustainable travel and community building, and our mission is to make carpooling a viable and popular choice for daily commutes and long-distance travel.</p>
      </Container>
      <footer className="footer">
        <p>&copy; 2024 Cofuel. All rights reserved.</p>
      </footer>
    </>
  );
};

export default InfoAboutProject;
