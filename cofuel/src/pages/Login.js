import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Container } from '../styles/GradientBackground';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      alert('Error logging in');
    } else {
      alert('Login successful');
      window.location.href = '/';
    }
  };

  return (
    <Container>
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
      <a href="/signup" className="link">Signup</a>
    </Container>
  );
};

export default Login;
