import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(to right, #ffcc66, #ff9966);
  padding: 40px 0;
  text-align: center;
  color: white;
  width: 100%;
  position: relative;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterColumn = styled.div`
  flex: 1;
  margin: 20px;
  min-width: 200px;
  text-align: center;

  h4 {
    font-size: 1.5em;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    font-size: 1em;
    margin: 5px 0;
  }
`;

const IconContainer = styled.div`
  margin-top: 10px;
  & > * {
    margin: 0 10px;
    font-size: 2em;
    color: white;
    transition: color 0.3s;

    &:hover {
      color: #ffcc66;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <h4>About Us</h4>
          <p>Learn more about our company and our mission.</p>
        </FooterColumn>
        <FooterColumn>
          <h4>Contact Us</h4>
          <p>Email: contact@cofuel.com</p>
          <p>Phone: +123 456 7890</p>
        </FooterColumn>
        <FooterColumn>
          <h4>Follow Us</h4>
          <IconContainer>
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </IconContainer>
        </FooterColumn>
      </FooterContent>
      <p>&copy; 2024 CoFuel. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
