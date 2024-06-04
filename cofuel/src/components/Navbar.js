import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaMap, FaInfoCircle, FaLink, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { slide as Menu } from 'react-burger-menu';
import { useMediaQuery } from 'react-responsive';
import logo from '../assets/logo.png';
import './Navbar.css';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ isScrolled }) => (isScrolled ? '0.5rem 1rem' : '1rem 2rem')};
  background: ${({ isScrolled }) => (isScrolled ? 'rgba(0, 100, 0, 0.8)' : '#006400')};
  box-shadow: ${({ isScrolled }) => (isScrolled ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none')};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: padding 0.3s, background 0.3s, box-shadow 0.3s;
  font-size: ${({ isScrolled }) => (isScrolled ? '0.9rem' : '1rem')};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  display: flex;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  transition: color 0.3s, border-bottom 0.3s;

  &:hover {
    color: #ffcc66;
    border-bottom: 2px solid #ffcc66;
  }

  &.active {
    border-bottom: 2px solid #ffcc66;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Lobster', cursive;
  font-size: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, color 0.3s;

  &:hover {
    transform: scale(1.1);
    color: #ffcc66;
  }

  img {
    width: 40px;
    height: auto;
    margin-right: 10px;
    border-radius: 50%;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin: 0 1rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  transition: color 0.3s;

  &:hover {
    color: #ffcc66;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const BurgerMenu = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasCheckedUser, setHasCheckedUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      if (!hasCheckedUser) {
        setHasCheckedUser(true);
        navigate('/map');
      }
    } else {
      setHasCheckedUser(true);
    }
  }, [navigate, hasCheckedUser]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <Nav isScrolled={isScrolled}>
      <LogoContainer>
        <img src={logo} alt="CoFuel Logo" />
        CoFuel
      </LogoContainer>
      {!isMobile && (
        <NavLinks>
          {user ? (
            <NavLink to="/map" className={location.pathname === '/map' ? 'active' : ''}>
              <FaMap />
              Map
            </NavLink>
          ) : (
            <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
              <FaHome />
              Home
            </NavLink>
          )}
          <NavLink to="/more-about-us" className={location.pathname === '/more-about-us' ? 'active' : ''}>
            <FaInfoCircle />
            More About Us
          </NavLink>
          <NavLink to="/info-about-project" className={location.pathname === '/info-about-project' ? 'active' : ''}>
            <FaInfoCircle />
            Info About the Project
          </NavLink>
          <NavLink to="/links" className={location.pathname === '/links' ? 'active' : ''}>
            <FaLink />
            Links
          </NavLink>
        </NavLinks>
      )}
      <BurgerMenu>
        <Menu right>
          {user ? (
            <NavLink to="/map" className={location.pathname === '/map' ? 'active' : ''}>
              <FaMap />
              Map
            </NavLink>
          ) : (
            <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
              <FaHome />
              Home
            </NavLink>
          )}
          <NavLink to="/more-about-us" className={location.pathname === '/more-about-us' ? 'active' : ''}>
            <FaInfoCircle />
            More About Us
          </NavLink>
          <NavLink to="/info-about-project" className={location.pathname === '/info-about-project' ? 'active' : ''}>
            <FaInfoCircle />
            Info About the Project
          </NavLink>
          <NavLink to="/links" className={location.pathname === '/links' ? 'active' : ''}>
            <FaLink />
            Links
          </NavLink>
        </Menu>
      </BurgerMenu>
      <div>
        {user ? (
          <>
            <NavLink to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
              <FaUser />
              {user.username}
            </NavLink>
            <Button onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={location.pathname === '/login' ? 'active' : ''}>
              <FaSignInAlt />
              Login
            </NavLink>
            <NavLink to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>
              <FaUserPlus />
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Navbar;
