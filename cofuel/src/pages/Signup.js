import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Container } from '../styles/GradientBackground';
import '../App.css';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const id = uuidv4(); // Genera un ID único
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert('Error signing up: ' + error.message);
    } else {
      const { error: insertError } = await supabase
        .from('user')
        .insert([{ id, email, username, date_of_birth: dateOfBirth }]);

      if (insertError) {
        alert('Error inserting user: ' + insertError.message);
      } else {
        alert('Signup successful');
        window.location.href = '/';
      }
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
        <h1>Signup</h1>
        <form onSubmit={handleSignup} className="form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            required
          />
          <input
            type="email"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="button">Signup</button>
        </form>
        <Link to="/login" className="link">Login</Link>
      </Container>
      <footer className="footer">
        <p>&copy; 2024 Cofuel. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Signup;
