import React from 'react';
import styled, { keyframes } from 'styled-components';

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #66ffcc, #ffcc66);
  background-size: 200% 200%;
  animation: ${gradientBackground} 10s ease infinite;
  color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
`;

const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 80%;
  max-width: 600px;
`;

const LinkItem = styled.li`
  background: #ffcc66;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  text-align: center;
  font-size: 1.2em;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Links = () => {
  return (
    <div>
      <LinksContainer>
        <Title>Links</Title>
        <LinkList>
          <LinkItem>
            <a href="https://vercel.com/hugocis-projects/co-fuel" target="_blank" rel="noopener noreferrer">Vercel Deployment</a>
          </LinkItem>
          <LinkItem>
            <a href="https://github.com/hugocis/CoFuel" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
          </LinkItem>
        </LinkList>
      </LinksContainer>
    </div>
  );
};

export default Links;
