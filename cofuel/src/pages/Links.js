import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LinksContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #66ffcc, #ffcc66);
  background-size: 200% 200%;
  animation: ${gradientBackground} 10s ease infinite;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 30px;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 80%;
  max-width: 600px;
`;

const LinkItem = styled.li`
  background: #ffcc66;
  padding: 20px;
  margin: 15px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 1.2em;
  transition: background 0.3s;

  &:hover {
    background: #ffb84d;
  }

  a {
    color: #333;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }

    svg {
      margin-left: 10px;
    }
  }

  p {
    margin: 10px 0 0;
    font-size: 0.9em;
    color: #666;
  }
`;

const Links = () => {
  return (
    <PageContainer>
      <LinksContainer>
        <Title>Useful Links</Title>
        <LinkList>
          <LinkItem>
            <a href="https://vercel.com/hugocis-projects/co-fuel" target="_blank" rel="noopener noreferrer">
              Vercel Deployment <FaExternalLinkAlt />
            </a>
            <p>Visit the CoFuel project deployed on Vercel.</p>
          </LinkItem>
          <LinkItem>
            <a href="https://github.com/hugocis/CoFuel" target="_blank" rel="noopener noreferrer">
              GitHub Repository <FaGithub />
            </a>
            <p>Explore the source code of the CoFuel project on GitHub.</p>
          </LinkItem>
        </LinkList>
      </LinksContainer>
    </PageContainer>
  );
};

export default Links;
