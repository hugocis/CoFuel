// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>WHERE EVERY TRIP COUNTS</h1>
      <h2>COFUEL</h2>
      <button>
        <Link to="/create-account">Join the revolution</Link>
      </button>
    </div>
  );
};

export default Home;
