import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { supabase } from '../supabaseClient';
import Spinner from '../components/Spinner';

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #66ffcc, #ffcc66);
  background-size: 200% 200%;
  animation: ${gradientBackground} 10s ease infinite;
  min-height: 100vh;
  padding: 50px;
`;

const ProfileCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
  margin-bottom: 20px;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

const UserInfo = styled.p`
  font-size: 18px;
  margin: 5px 0;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 12px;
  border-radius: 10px;
  border: none;
  background-color: #56ab2f;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: #3a7d1c;
    transform: scale(1.05);
  }
`;

const Message = styled.p`
  color: ${({ error }) => (error ? 'red' : 'green')};
  margin: 10px 0;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        const { data, error } = await supabase
          .from('user')
          .select('*')
          .eq('email', storedUser.email)
          .single();

        if (data) {
          setUser(data);
          setUsername(data.username);
          setEmail(data.email);
          setAvatar(data.avatar_url);
        } else {
          setMessage(error.message);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const { data, error } = await supabase
      .from('user')
      .update({ username, email, avatar_url: avatar })
      .eq('email', storedUser.email)
      .select('*');  // Ensure data is returned after update

    if (error) {
      setMessage(error.message);
    } else if (data && data.length > 0) {
      setUser(data[0]);
      localStorage.setItem('user', JSON.stringify(data[0]));
      setMessage('Profile updated successfully!');
    } else {
      setMessage('No user data returned');
    }
    setLoading(false);
  };

  const handleAvatarUpload = async (e) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${storedUser.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    let { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      setMessage(uploadError.message);
      return;
    }

    const { publicURL, error: urlError } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (urlError) {
      setMessage(urlError.message);
      return;
    }

    setAvatar(publicURL);
  };

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : user ? (
        <>
          <ProfileCard>
            <Title>User Profile</Title>
            {avatar && <Avatar src={avatar} alt="Avatar" />}
            <UserInfo><strong>Username:</strong> {user.username}</UserInfo>
            <UserInfo><strong>Email:</strong> {user.email}</UserInfo>
          </ProfileCard>
          <Form onSubmit={handleUpdate}>
            <Title>Update Profile</Title>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="file"
              onChange={handleAvatarUpload}
            />
            <Button type="submit">Update</Button>
            {message && <Message error={message.includes('Error')}>{message}</Message>}
          </Form>
        </>
      ) : (
        <p>Please <Link to="/login">login</Link> to view your profile.</p>
      )}
    </Container>
  );
};

export default UserPage;
