import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import '../App.css';

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
    <div className="container">
      <div className="header">Signup</div>
      <form className="form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Sign up</button>
      </form>
      <Link to="/login" className="link">Login</Link>
    </div>
  );
};

export default Signup;
