import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Container } from '../styles/GradientBackground';
import '../App.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Error logging in: ' + error.message);
    } else {
      alert('Login successful');
      window.location.href = '/';
    }
  };

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
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="form">
          <input
            type="email"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">Login</button>
        </form>
        <Link to="/signup" className="link">Signup</Link>
      </Container>
      <footer className="footer">
        <p>&copy; 2024 Cofuel. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Login;
