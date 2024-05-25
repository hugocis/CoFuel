import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #2d8bbf, #f2a365);
  background-size: 200% 200%;
  animation: gradientBackground 10s ease infinite;
  color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #ffcc66;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #ffaa00;
  }
`;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, dateOfBirth },
      },
    });

    if (error) {
      alert('Error signing up');
    } else {
      navigate('/map');
    }
  };

  return (
    <Container>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSignup}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
};

export default Signup;
