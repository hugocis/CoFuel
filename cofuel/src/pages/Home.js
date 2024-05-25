import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../styles/GradientBackground'; // Importa el componente Container
import background from '../assets/background.png'; // Asegúrate de que la ruta sea correcta
import '../App.css';

const Home = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/more-about-us" className="nav-link">More About Us</Link>
        <Link to="/info-about-project" className="nav-link">Info About the Project</Link>
        <Link to="/links" className="nav-link">Links</Link>
      </nav>
      <Container>
        <div className="title">
          WHERE EVERY TRIP COUNTS <span className="title-green">COFUEL</span>
        </div>
        <img src={background} alt="Cofuel background" className="background" />
        <Link to="/create-account" className="button">Join the revolution</Link>
      </Container>
      <footer className="footer">
        <p>&copy; 2024 Cofuel. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
