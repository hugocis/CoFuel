import React, { useState } from 'react';
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

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
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

const VehicleRegistrationTest = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [newVehicle, setNewVehicle] = useState({
    id_vehicle: '',
    seats: '',
    consumption: '',
    model: '',
    colour: '',
    vehicle_image_url: '',
  });

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
    const fileName = `test_vehicle_${Date.now()}.${fileExt}`;
    const filePath = `vehicle_images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('vehicle_images')
      .upload(filePath, file);

    if (uploadError) {
      setMessage(`Error uploading image: ${uploadError.message}`);
      return;
    }

    const { publicURL, error: urlError } = supabase
      .storage
      .from('vehicle_images')
      .getPublicUrl(filePath);

    if (urlError) {
      setMessage(`Error getting public URL: ${urlError.message}`);
      return;
    }

    setNewVehicle((prevVehicle) => ({
      ...prevVehicle,
      vehicle_image_url: publicURL,
    }));
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);

    const storedUser = JSON.parse(localStorage.getItem('user'));

    const { error } = await supabase
      .from('vehicle')
      .insert([{ ...newVehicle, id_user: storedUser.id }]);

    if (error) {
      setMessage(`Error adding vehicle: ${error.message}`);
    } else {
      setMessage('Vehicle added successfully!');
      setNewVehicle({
        id_vehicle: '',
        seats: '',
        consumption: '',
        model: '',
        colour: '',
        vehicle_image_url: '',
      });
    }
    setLoading(false);
  };

  return (
    <Container>
      <Title>Vehicle Registration Test</Title>
      <Form onSubmit={handleAddVehicle}>
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
        {loading && <Spinner />}
        {message && <Message error={message.includes('Error')}>{message}</Message>}
      </Form>
    </Container>
  );
};

export default VehicleRegistrationTest;
