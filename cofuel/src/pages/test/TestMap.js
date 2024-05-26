import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0; /* Fondo gris claro */
`;

const MapWrapper = styled.div`
  width: 80%;
  height: 60%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const MapPage = () => {
  const mapContainerRef = useRef(null);

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

    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBTrtlFqyMH3HAUewO9Q3ZpNpSb69DG4JQ`;
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
  }, []);

  return (
    <MapContainer>
      <MapWrapper>
        <div ref={mapContainerRef} style={{ height: '100%' }} />
      </MapWrapper>
    </MapContainer>
  );
};

export default MapPage;
