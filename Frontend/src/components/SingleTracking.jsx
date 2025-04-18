import React, { useEffect, useRef } from 'react';
import { loadGoogleMaps } from '../utility/loadGoogleMaps';

const SingleTracking = () => {
  const mapRef = useRef();
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      try {
        const google = await loadGoogleMaps();
        if (!isMounted) return;

        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        mapInstance.current = new Map(mapRef.current, {
          center: { lat: 23.267080, lng: 77.383278 },
          zoom: 13,
          mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
        });

        markerInstance.current = new AdvancedMarkerElement({
          map: mapInstance.current,
          position: { lat: 23.267080, lng: 77.383278 },
          title: "Bhopal",
        });

        getUserLocation();
      } catch (error) {
        console.error("Failed to initialize map:", error);
      }
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, []);

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          if (position && position.coords) {
            const { latitude, longitude } = position.coords;
            updateLocation(latitude, longitude);
          } else {
            console.error("Invalid position data received:", position);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function updateLocation(lat, lng) {
    if (mapInstance.current && markerInstance.current) {
      const newPosition = { lat, lng };
      mapInstance.current.setCenter(newPosition);
      markerInstance.current.position = newPosition;
    } else {
      console.log('Map or marker instance is not created.');
    }
  }

  return (
    <div ref={mapRef} className='w-full h-full'></div>
  );
};

export default SingleTracking;