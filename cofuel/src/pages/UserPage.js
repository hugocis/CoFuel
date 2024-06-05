import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { supabase, addFriend, acceptFriend, removeFriend, fetchFriends } from '../supabaseClient';
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
  margin-bottom: 20px;
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

const VehicleInfo = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  width: 350px;
  text-align: center;
`;

const FriendsList = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  width: 350px;
  text-align: center;
`;

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(true);
  const [profileMessage, setProfileMessage] = useState('');
  const [vehicleMessage, setVehicleMessage] = useState('');
  const [friends, setFriends] = useState([]);
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const [friendMessage, setFriendMessage] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    id_vehicle: '',
    seats: '',
    consumption: '',
    model: '',
    colour: '',
    vehicle_image_url: '',
  });

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

          // Fetch user vehicles
          const { data: userVehicles, error: vehicleError } = await supabase
            .from('vehicle')
            .select('*')
            .eq('id_user', data.id);

          if (vehicleError) {
            console.error('Error fetching vehicles:', vehicleError);
          } else {
            setVehicles(userVehicles);
          }

          // Fetch user friends
          const friendsData = await fetchFriends(data.id);
          setFriends(friendsData);
        } else {
          setProfileMessage(error.message);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };

  const handleVehicleImageUpload = async (e) => {
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user ? user.id : 'anonymous'}_${newVehicle.id_vehicle}.${fileExt}`;
    const filePath = `vehicle_images/${fileName}`;

    // Delete existing file if it exists
    const { error: deleteError } = await supabase.storage
      .from('vehicle_images')
      .remove([filePath]);

    if (deleteError && deleteError.message !== 'The resource was not found') {
      console.error('Error deleting existing file:', deleteError.message);
      return;
    }

    // Upload new file
    const { error: uploadError } = await supabase.storage
      .from('vehicle_images')
      .upload(filePath, file);

    if (uploadError) {
      setVehicleMessage(uploadError.message);
      return;
    }

    // Get public URL of the uploaded file
    const { data: publicURLData, error: urlError } = await supabase
      .storage
      .from('vehicle_images')
      .getPublicUrl(filePath);

    if (urlError) {
      setVehicleMessage(urlError.message);
      return;
    }

    const publicURL = publicURLData.publicUrl;

    setNewVehicle((prevVehicle) => ({
      ...prevVehicle,
      vehicle_image_url: publicURL,
    }));
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();

    const id_user = user ? user.id : 'anonymous';

    const { error } = await supabase
      .from('vehicle')
      .insert([{ ...newVehicle, id_user }]);

    if (error) {
      setVehicleMessage(`Error adding vehicle: ${error.message}`);
    } else {
      // Recargar los vehículos después de agregar uno nuevo
      const { data: userVehicles, error: vehicleError } = await supabase
        .from('vehicle')
        .select('*')
        .eq('id_user', id_user);

      if (vehicleError) {
        console.error('Error fetching vehicles:', vehicleError);
      } else {
        setVehicles(userVehicles);
      }

      setNewVehicle({
        id_vehicle: '',
        seats: '',
        consumption: '',
        model: '',
        colour: '',
        vehicle_image_url: '',
      });
      setVehicleMessage('Vehicle added successfully!');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const storedUser = JSON.parse(localStorage.getItem('user'));

    const { data, error } = await supabase
      .from('user')
      .update({ username, email, avatar_url: avatar })
      .eq('id', storedUser.id)
      .select('*');

    if (error) {
      setProfileMessage(`Error updating profile: ${error.message}`);
    } else if (data && data.length > 0) {
      const updatedUser = data[0];
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setProfileMessage('Profile updated successfully!');
    } else {
      setProfileMessage('No user data returned');
    }
    setLoading(false);
  };

  const handleAvatarUpload = async (e) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${storedUser.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Delete existing file if it exists
    const { error: deleteError } = await supabase.storage
      .from('avatars')
      .remove([filePath]);

    if (deleteError && deleteError.message !== 'The resource was not found') {
      console.error('Error deleting existing file:', deleteError.message);
    }

    // Upload new file
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      setProfileMessage(uploadError.message);
      return;
    }

    // Get public URL of the uploaded file
    const { data: publicURLData, error: urlError } = await supabase
      .storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (urlError) {
      setProfileMessage(urlError.message);
      return;
    }

    const publicURL = publicURLData.publicUrl;

    // Update user profile with new avatar URL
    const { data: updateData, error: updateError } = await supabase
      .from('user')
      .update({ avatar_url: publicURL })
      .eq('id', storedUser.id)
      .select('*');

    if (updateError) {
      setProfileMessage(`Error updating profile: ${updateError.message}`);
      return;
    }

    if (updateData && updateData.length > 0) {
      const updatedUser = updateData[0];
      setUser(updatedUser);
      setAvatar(publicURL);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setProfileMessage('Profile updated successfully!');
    } else {
      setProfileMessage('No user data returned');
    }
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('user')
      .select('id')
      .eq('email', newFriendEmail)
      .single();

    if (error) {
      setFriendMessage(`Error finding user: ${error.message}`);
      return;
    }

    if (data) {
      const friendId = data.id;
      const result = await addFriend(user.id, friendId);
      if (result) {
        setFriendMessage('Friend request sent!');
      } else {
        setFriendMessage('Error sending friend request.');
      }
    } else {
      setFriendMessage('User not found.');
    }
  };

  const handleAcceptFriend = async (friendId) => {
    const result = await acceptFriend(user.id, friendId);
    if (result) {
      setFriends((prevFriends) =>
        prevFriends.map((friend) =>
          friend.friend_id === friendId ? { ...friend, status: 'accepted' } : friend
        )
      );
    } else {
      setFriendMessage('Error accepting friend request.');
    }
  };

  const handleRemoveFriend = async (friendId) => {
    const result = await removeFriend(user.id, friendId);
    if (result) {
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.friend_id !== friendId)
      );
    } else {
      setFriendMessage('Error removing friend.');
    }
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
          <Form onSubmit={handleProfileUpdate}>
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
            {profileMessage && <Message error={profileMessage.includes('Error')}>{profileMessage}</Message>}
          </Form>
          <Form onSubmit={handleAddVehicle}>
            <Title>Add Vehicle</Title>
            <Input
              type="text"
              name="id_vehicle"
              placeholder="Plate"
              value={newVehicle.id_vehicle}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              name="seats"
              placeholder="Seats"
              value={newVehicle.seats}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              name="consumption"
              placeholder="Consumption per 100 km"
              value={newVehicle.consumption}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="model"
              placeholder="Model"
              value={newVehicle.model}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="colour"
              placeholder="Colour"
              value={newVehicle.colour}
              onChange={handleInputChange}
              required
            />
            <Input
              type="file"
              name="vehicle_image"
              placeholder="Upload Vehicle Image"
              onChange={handleVehicleImageUpload}
            />
            <Button type="submit">Add Vehicle</Button>
            {vehicleMessage && <Message error={vehicleMessage.includes('Error')}>{vehicleMessage}</Message>}
          </Form>
          <Form onSubmit={handleAddFriend}>
            <Title>Add Friend</Title>
            <Input
              type="email"
              placeholder="Friend's Email"
              value={newFriendEmail}
              onChange={(e) => setNewFriendEmail(e.target.value)}
            />
            <Button type="submit">Add Friend</Button>
            {friendMessage && <Message error={friendMessage.includes('Error')}>{friendMessage}</Message>}
          </Form>
          <FriendsList>
            <Title>Friends</Title>
            {friends.length > 0 ? (
              friends.map((friend) => (
                <div key={friend.id}>
                  <p>{friend.friend_id}</p>
                  {friend.status === 'pending' && (
                    <Button onClick={() => handleAcceptFriend(friend.friend_id)}>Accept</Button>
                  )}
                  <Button onClick={() => handleRemoveFriend(friend.friend_id)}>Remove</Button>
                </div>
              ))
            ) : (
              <p>No friends found</p>
            )}
          </FriendsList>
          <div>
            <Title>Your Vehicles</Title>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <VehicleInfo key={vehicle.id_vehicle}>
                  <p>Plate: {vehicle.id_vehicle}</p>
                  <p>Seats: {vehicle.seats}</p>
                  <p>Consumption per 100 km: {vehicle.consumption}</p>
                  <p>Model: {vehicle.model}</p>
                  <p>Colour: {vehicle.colour}</p>
                  {vehicle.vehicle_image_url && <img src={vehicle.vehicle_image_url} alt="Vehicle" width="100" />}
                </VehicleInfo>
              ))
            ) : (
              <p>No vehicles found</p>
            )}
          </div>
        </>
      ) : (
        <p>Please <Link to="/login">login</Link> to view your profile.</p>
      )}
    </Container>
  );
};

export default UserPage;
