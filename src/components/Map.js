import React, { useEffect, useRef, useState } from 'react';
import './Map.css';

const Map = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      // Initialize the map
      const platform = new window.H.service.Platform({
        apikey: process.env.REACT_APP_HERE_API_KEY,
      });
      const defaultLayers = platform.createDefaultLayers();
      const mapInstance = new window.H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          zoom: 13,
          center: { lat: 51.505, lng: -0.09 },
        }
      );

      const behavior = new window.H.mapevents.Behavior(
        new window.H.mapevents.MapEvents(mapInstance)
      );
      const ui = window.H.ui.UI.createDefault(mapInstance, defaultLayers);

      setMap(mapInstance);

      // Get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          mapInstance.setCenter({ lat: latitude, lng: longitude });

          // Creating a marker and add it to the map
          const marker = new window.H.map.Marker({ lat: latitude, lng: longitude });
          mapInstance.addObject(marker); 
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    }

    // Cleanup map instance on component unmount
    return () => {
      if (map) {
        map.dispose();
      }
    };
  }, [map]);

  return <div id="map" ref={mapRef} style={{ height: '500px', width: '100%' }}></div>;
};

export default Map;
