import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MapPage = () => {
  const mapContainerRef = useRef(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [directDistance, setDirectDistance] = useState('');
  const [directDuration, setDirectDuration] = useState('');
  const [waypoints, setWaypoints] = useState([{ id: 0, location: '' }]);
  const [legs, setLegs] = useState([]);

  useEffect(() => {
    const initializeMap = (position) => {
      const { latitude, longitude } = position.coords;
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: "You are here",
      });

      new window.google.maps.places.Autocomplete(document.getElementById('origin'));
      new window.google.maps.places.Autocomplete(document.getElementById('destination'));

      waypoints.forEach((waypoint) => {
        new window.google.maps.places.Autocomplete(document.getElementById(`waypoint-${waypoint.id}`));
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

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
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC_LtP0pEQY_Bd1CMcQSPAa8tm67P4bkDE&libraries=places`;
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
  }, [waypoints]);

  const addWaypoint = () => {
    setWaypoints([...waypoints, { id: waypoints.length, location: '' }]);
  };

  const removeWaypoint = (id) => {
    setWaypoints(waypoints.filter(waypoint => waypoint.id !== id));
  };

  return (
    <Wrapper>
      <InputContainer>
        <Input id="origin" type="text" placeholder="Enter origin" />
        {waypoints.map((waypoint, index) => (
          <WaypointContainer key={index}>
            <Input id={`waypoint-${waypoint.id}`} type="text" placeholder={`Enter stop ${index + 1}`} />
            <RemoveButton onClick={() => removeWaypoint(waypoint.id)}>X</RemoveButton>
          </WaypointContainer>
        ))}
        <Input id="destination" type="text" placeholder="Enter destination" />
        <Button onClick={addWaypoint}>Add Stop</Button>
        <Button id="calculate">Calculate Route</Button>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #66ffcc, #ffcc66);
  background-size: 200% 200%;
  animation: gradientBackground 10s ease infinite;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  flex: 1 1 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #ffcc66;
  color: white;
  cursor: pointer;
  flex: 0 1 auto;

  &:hover {
    background-color: #ffaa00;
  }
`;

const MapContainer = styled.div`
  width: 80%;
  height: 60vh;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
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
`;

const RemoveButton = styled.button`
  padding: 5px;
  border-radius: 50%;
  border: none;
  background-color: #ff6666;
  color: white;
  cursor: pointer;
  margin-left: 5px;

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
