import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const CreateAccount = () => {
  return (
    <div className="container">
      <div className="header">COFUEL</div>
      <div className="subheader">Where every trip counts</div>
      <Link to="/signup" className="button">Create an account</Link>
      <Link to="/login" className="link">Already have an account? Log in</Link>
    </div>
  );
};

export default CreateAccount;
