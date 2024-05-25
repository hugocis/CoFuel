import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) console.error('Error logging in:', error.message);
    else console.log('Logged in successfully');
  };

  return (
    <div className="container">
      <div className="header">Login</div>
      <form className="form" onSubmit={handleLogin}>
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
    </div>
  );
};

export default Login;
