import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(0, 128, 0, 0.9); /* Verde con opacidad */
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 1rem;

  &:hover {
    color: #ffcc66;
    border-radius: 5px;
  }
`;

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <Nav>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/more-about-us">More About Us</NavLink>
        <NavLink to="/info-about-project">Info About the Project</NavLink>
        <NavLink to="/links">Links</NavLink>
      </div>
      <div>
        {user ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink as="button" onClick={handleLogout}>Logout</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Navbar;
