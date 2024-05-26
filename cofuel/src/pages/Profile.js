import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #66ffcc, #ffcc66);
  color: #fff;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Info = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>User Profile</Title>
      <Info>
        <p>Email: {user.email}</p>
        <p>Username: {user.user_metadata.username}</p>
      </Info>
    </Container>
  );
};

export default Profile;
