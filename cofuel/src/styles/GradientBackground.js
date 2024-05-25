import styled, { keyframes } from 'styled-components';

const gradientBackground = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #2d8bbf, #f2a365);
  background-size: 200% 200%;
  animation: ${gradientBackground} 10s ease infinite;
  color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;
