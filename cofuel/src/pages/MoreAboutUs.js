import React from 'react';
import styled from 'styled-components';
import hugo from '../assets/teamMembers/hugo.jpg';
import javier from '../assets/teamMembers/javier.jpg';
import alicia from '../assets/teamMembers/alicia.jpg';
import estelle from '../assets/teamMembers/estelle.jpg';
import fernando from '../assets/teamMembers/fernando.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #66ffcc, #ffcc66);
`;

const Title = styled.h1`
  margin: 20px 0;
  font-size: 2.5em;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 800px;
`;

const Member = styled.div`
  margin: 10px;
  text-align: center;
`;

const MemberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const MoreAboutUs = () => {
  return (
    <Container>
      <Title>More About Us</Title>
      <TeamContainer>
        <Member>
          <MemberImage src={hugo} alt="Hugo Cisneros" />
          <p>Hugo Cisneros</p>
        </Member>
        <Member>
          <MemberImage src={javier} alt="Javier de Santos" />
          <p>Javier de Santos</p>
        </Member>
        <Member>
          <MemberImage src={alicia} alt="Alicia García" />
          <p>Alicia García</p>
        </Member>
        <Member>
          <MemberImage src={estelle} alt="Estelle Pamen" />
          <p>Estelle Pamen</p>
        </Member>
        <Member>
          <MemberImage src={fernando} alt="Fernando Teba" />
          <p>Fernando Teba</p>
        </Member>
      </TeamContainer>
    </Container>
  );
};

export default MoreAboutUs;
