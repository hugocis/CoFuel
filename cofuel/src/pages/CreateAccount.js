// src/pages/CreateAccount.js
import React from 'react';
import { Link } from 'react-router-dom';

const CreateAccount = () => {
  return (
    <div className="create-account">
      <h1>COFUEL</h1>
      <p>Where every trip counts</p>
      <button>
        <Link to="/signup">Create an account</Link>
      </button>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default CreateAccount;
