import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';

const MapPage = () => {
  const mapContainerRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [directDistance, setDirectDistance] = useState('');
  const [directDuration, setDirectDuration] = useState('');
  const [waypoints, setWaypoints] = useState([{ id: 0, location: '' }]);
  const [legs, setLegs] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);

  // Fetch user data from Supabase
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
          setAvatarUrl(data.avatar_url);
        } else {
          console.error('Error fetching user data:', error);
        }
      }

      const { data: users, error: usersError } = await supabase
        .from('user')
        .select('*');

      if (usersError) {
        console.error('Error fetching other users:', usersError);
      } else {
        setOtherUsers(users);
      }
    };

    fetchUserData();
  }, []);

  // Initialize the Google Map
  useEffect(() => {
    const initializeMap = (position) => {
      const { latitude, longitude } = position.coords;
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      });

      // Add marker for the current user
      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: "You are here",
        icon: {
          url: avatarUrl,
          scaledSize: new window.google.maps.Size(50, 50),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(25, 25),
        },
      });

      // Add markers for other users
      otherUsers.forEach(user => {
        if (user.latitude && user.longitude && user.avatar_url) {
          new window.google.maps.Marker({
            position: { lat: user.latitude, lng: user.longitude },
            map,
            title: user.username,
            icon: {
              url: user.avatar_url,
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 25),
            },
          });
        }
      });

      // Initialize autocomplete for origin, destination, and waypoints
      new window.google.maps.places.Autocomplete(document.getElementById('origin'));
      new window.google.maps.places.Autocomplete(document.getElementById('destination'));

      waypoints.forEach((waypoint) => {
        new window.google.maps.places.Autocomplete(document.getElementById(`waypoint-${waypoint.id}`));
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      // Function to calculate the route
      const calculateRoute = () => {
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        
        if (!originInput || !destinationInput) {
          console.error('Origin or destination input not found');
          return;
        }

        const origin = originInput.value;
        const destination = destinationInput.value;
        const waypts = waypoints.map((waypoint) => {
          const waypointInput = document.getElementById(`waypoint-${waypoint.id}`);
          return {
            location: waypointInput ? waypointInput.value : '',
            stopover: true,
          };
        }).filter(waypoint => waypoint.location);

        if (origin && destination) {
          directionsService.route(
            {
              origin,
              destination,
              waypoints: waypts,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
                const route = result.routes[0];
                setLegs(route.legs);
                const totalDistance = route.legs.reduce((acc, leg) => acc + leg.distance.value, 0) / 1000;
                const totalDuration = route.legs.reduce((acc, leg) => acc + leg.duration.value, 0) / 60;
                setDistance(totalDistance.toFixed(2) + ' km');
                setDuration(totalDuration.toFixed(2) + ' min');
              } else {
                console.error('Error fetching directions', result);
              }
            }
          );

          // Calculate direct route
          directionsService.route(
            {
              origin,
              destination,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                const directRoute = result.routes[0];
                const directLeg = directRoute.legs[0];
                setDirectDistance(directLeg.distance.text);
                setDirectDuration(directLeg.duration.text);
              } else {
                console.error('Error fetching direct directions', result);
              }
            }
          );
        }
      };

      document.getElementById('calculate').addEventListener('click', calculateRoute);
    };

    // Load Google Maps script
    const handleScriptLoad = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            initializeMap(position);
          },
          (error) => {
            console.error('Error getting location:', error);
            initializeMap({ coords: { latitude: -34.397, longitude: 150.644 } }); // Fallback location
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        initializeMap({ coords: { latitude: -34.397, longitude: 150.644 } }); // Fallback location
      }
    };

    if (!window.google || !window.google.maps || !window.google.maps.places) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = handleScriptLoad;
      script.onerror = (error) => {
        console.error('Error loading Google Maps script:', error);
      };
      document.head.appendChild(script);
    } else {
      handleScriptLoad();
    }
  }, [avatarUrl, waypoints, otherUsers]);

  // Function to add a waypoint
  const addWaypoint = () => {
    setWaypoints([...waypoints, { id: waypoints.length, location: '' }]);
  };

  // Function to remove a waypoint
  const removeWaypoint = (id) => {
    setWaypoints(waypoints.filter(waypoint => waypoint.id !== id));
  };

  return (
    <Wrapper>
      <InputContainer>
        <InputsWrapper>
          <InputWrapper>
            <Label>Origin:</Label>
            <Input id="origin" type="text" placeholder="Enter origin" />
          </InputWrapper>
          {waypoints.map((waypoint, index) => (
            <WaypointContainer key={index}>
              <InputWrapper>
                <Label>Stop {index + 1}:</Label>
                <Input id={`waypoint-${waypoint.id}`} type="text" placeholder={`Enter stop ${index + 1}`} />
              </InputWrapper>
              <RemoveButton onClick={() => removeWaypoint(waypoint.id)}>X</RemoveButton>
            </WaypointContainer>
          ))}
          <InputWrapper>
            <Label>Destination:</Label>
            <Input id="destination" type="text" placeholder="Enter destination" />
          </InputWrapper>
        </InputsWrapper>
        <ButtonWrapper>
          <Button onClick={addWaypoint}>Add Stop</Button>
          <Button id="calculate">Calculate Route</Button>
        </ButtonWrapper>
      </InputContainer>
      <MapContainer ref={mapContainerRef} />
      {legs.length > 0 && (
        <InfoContainer>
          {legs.map((leg, index) => (
            <InfoItem key={index}>
              <strong>Segment {index + 1}:</strong> {leg.distance.text}, {leg.duration.text}
            </InfoItem>
          ))}
          <InfoItem>
            <strong>Total Distance:</strong> {distance}
          </InfoItem>
          <InfoItem>
            <strong>Total Duration:</strong> {duration}
          </InfoItem>
          <DirectInfoContainer>
            <DirectInfoItem>
              <strong>Direct Distance (no stops):</strong> {directDistance}
            </DirectInfoItem>
            <DirectInfoItem>
              <strong>Direct Duration (no stops):</strong> {directDuration}
            </DirectInfoItem>
          </DirectInfoContainer>
        </InfoContainer>
      )}
    </Wrapper>
  );
};

export default MapPage;

// Styled-components for the layout
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Adjusted to start from the top */
  height: 100vh;
  background: linear-gradient(135deg, #66ffcc, #ffcc66);
  background-size: 200% 200%;
  animation: gradientBackground 10s ease infinite;
  padding-top: 20px; /* Added padding to avoid overlapping with top */
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 90%; /* Adjusted to prevent overlap */
  margin-bottom: 20px;
  flex-wrap: wrap; /* Allow wrapping */
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  gap: 10px; /* Added gap to prevent overlap */
`;

const InputWrapper = styled.div`
  flex: 1 1 calc(33.333% - 20px); /* Adjusted to fit three items in a row */
  margin: 10px 0;
`;

const Input = styled.input`
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 10px; /* Ensure buttons are aligned to the right */
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #ffcc66;
  color: white;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #ffaa00;
  }
`;

const MapContainer = styled.div`
  width: 90%;
  height: 60vh;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.div`
  flex: 1;
  text-align: center;
  margin: 5px 0;
`;

const WaypointContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RemoveButton = styled.button`
  padding: 5px;
  border-radius: 50%;
  border: none;
  background-color: #ff6666;
  color: white;
  cursor: pointer;
  margin-left: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #ff3333;
  }
`;

const DirectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 80%;
`;

const DirectInfoItem = styled.div`
  text-align: center;
  margin: 5px 0;
  flex: 1;
`;
