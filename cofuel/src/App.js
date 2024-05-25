import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserPage from './pages/UserPage';  // Importa la nueva página

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-page" element={<UserPage />} /> {/* Añade la nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
