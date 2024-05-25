import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import '../App.css';

const UserPage = () => {
  return (
    <div className="container">
      <div className="header">Your Account</div>
      <Link to="/post-trip" className="button">Post trip</Link>
      <Link to="/book-ride" className="button">Book ride</Link>
      <Link to="/user-page" className="button">User page</Link>
    </div>
  );
};

export default UserPage;
