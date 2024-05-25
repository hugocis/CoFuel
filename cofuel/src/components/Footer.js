import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #ffcc66;
  padding: 10px 0;
  text-align: center;
  color: white;
  position: sticky;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 CoFuel. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
