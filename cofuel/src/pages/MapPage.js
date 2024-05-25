import React, { useEffect, useRef } from 'react';

const MapPage = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBTrtlFqyMH3HAUewO9Q3ZpNpSb69DG4JQ`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <div ref={mapContainerRef} style={{ height: '100%' }} />
    </div>
  );
};

export default MapPage;
