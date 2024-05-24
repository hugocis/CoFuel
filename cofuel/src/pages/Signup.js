// src/pages/Signup.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';  // Asegúrate de importar Link

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [rating, setRating] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    }, {
      data: {
        username,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        rating: rating ? parseFloat(rating) : null,
      }
    });
    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      console.log('Signed up successfully');
    }
  };

  return (
    <div className="signup">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <input
          type="text"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
      <button>
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
};

export default Signup;
