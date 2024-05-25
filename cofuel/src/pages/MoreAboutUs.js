import React from 'react';
import { Container } from '../styles/GradientBackground';
import '../App.css';

const MoreAboutUs = () => {
  return (
    <Container>
      <h1>More About Us</h1>
      <div className="team">
        <div className="team-member">
          <div className="member-photo" id="hugo-photo"></div>
          <p>Hugo Cisneros</p>
        </div>
        <div className="team-member">
          <div className="member-photo" id="javier-photo"></div>
          <p>Javier de Santos</p>
        </div>
        <div className="team-member">
          <div className="member-photo" id="alicia-photo"></div>
          <p>Alicia García</p>
        </div>
        <div className="team-member">
          <div className="member-photo" id="estelle-photo"></div>
          <p>Estelle Pamen</p>
        </div>
        <div className="team-member">
          <div className="member-photo" id="fernando-photo"></div>
          <p>Fernando Teba</p>
        </div>
      </div>
    </Container>
  );
};

export default MoreAboutUs;
