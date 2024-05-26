import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #66ffcc, #ffcc66);
  background-size: 200% 200%;
  animation: ${gradientBackground} 10s ease infinite;
  min-height: 72.80vh;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #666;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  padding: 15px;
  margin: 10px 0;
  background: #ffcc66;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ffa500;
  }

  &:focus {
    outline: 3px solid #333;
  }

  svg {
    margin-right: 10px;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/assets/background.png') no-repeat center center/cover;
  z-index: -1;
  opacity: 0.2;
`;

const Home = () => {
  return (
    <HomeContainer>
      <BackgroundImage />
      <Title>Where Every Trip Counts</Title>
      <Subtitle>Join us and start your journey today!</Subtitle>
      <StyledLink to="/signup">
        <Button>
          <FaUserPlus />
          Create an account
        </Button>
      </StyledLink>
    </HomeContainer>
  );
};

export default Home;
