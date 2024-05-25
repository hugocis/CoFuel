import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InfoAboutProject from './pages/InfoAboutProject';
import MoreAboutUs from './pages/MoreAboutUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/info-about-project" element={<InfoAboutProject />} />
        <Route path="/more-about-us" element={<MoreAboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
