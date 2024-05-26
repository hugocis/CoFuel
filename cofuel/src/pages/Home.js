import React from 'react';
import styled, { keyframes } from 'styled-components';

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #66ffcc, #ffcc66);
  background-size: 200% 200%;
  animation: ${gradientBackground} 10s ease infinite;
  min-height: 100vh;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
`;

const Button = styled.button`
  width: 200px;
  padding: 10px;
  margin: 10px 0;
  background: #ffcc66;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;

  &:hover {
    background: #ffa500;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Where Every Trip Counts</Title>
      <Button to="/signup">Create an account</Button>
    </HomeContainer>
  );
};

export default Home;
