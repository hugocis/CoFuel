import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoreAboutUs from './pages/MoreAboutUs';
import InfoAboutProject from './pages/InfoAboutProject';
import Links from './pages/Links';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/UserPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MapPage from './pages/MapPage'; 
import TestMap from './pages/test/TestMap';
import TestConnection from './pages/test/TestConnection';

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
        <Route path="/map" element={<MapPage />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/test-connection" element={<TestConnection />} />
        <Route path="/test-map" element={<TestMap />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
