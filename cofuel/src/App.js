import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoreAboutUs from './pages/MoreAboutUs';
import InfoAboutProject from './pages/InfoAboutProject';
import Links from './pages/Links';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MapPage from './pages/MapPage'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/more-about-us" element={<MoreAboutUs />} />
        <Route path="/info-about-project" element={<InfoAboutProject />} />
        <Route path="/links" element={<Links />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/map" element={<MapPage />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
