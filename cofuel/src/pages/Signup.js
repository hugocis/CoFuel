import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Container } from '../styles/GradientBackground';
import '../App.css';
import { v4 as uuidv4 } from 'uuid';

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
        .from('users')
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
    <Container>
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
      <a href="/login" className="link">Login</a>
    </Container>
  );
};

export default Signup;
