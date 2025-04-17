import React, { useEffect, useRef, useState } from "react";

const DoubleTracking = ({ destination }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); // NEW: store the map instance
  const directionsRendererRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const [origin, setOrigin] = useState();

  // Initialize the map and DirectionsRenderer
  useEffect(() => {
    if (!destination) return;

    async function initMap() {
      if (!mapRef.current) return;

      const { Map } = await google.maps.importLibrary("maps");
      const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary("routes");

      const map = new Map(mapRef.current, {
        zoom: 13,
        center: destination,
        disableDefaultUI: true,
      });

      mapInstanceRef.current = map; // store map instance
      directionsServiceRef.current = new DirectionsService();
      directionsRendererRef.current = new DirectionsRenderer();
      directionsRendererRef.current.setMap(map); // bind to map here
    }

    initMap();
  }, [destination]);

  // Render directions once everything is ready
  useEffect(() => {
    if (!origin || !destination) return;

    const tryRenderDirections = () => {
      if (
        !directionsServiceRef.current ||
        !directionsRendererRef.current ||
        !mapInstanceRef.current
      ) {
        return false;
      }

      directionsRendererRef.current.setMap(mapInstanceRef.current);

      directionsServiceRef.current
        .route({
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
          directionsRendererRef.current.setDirections(response);
          console.log("✅ Route rendered");
        })
        .catch((error) => console.error("❌ Directions request failed", error));

      return true;
    };

    const intervalId = setInterval(() => {
      if (tryRenderDirections()) {
        clearInterval(intervalId);
      }
    }, 200);

    return () => clearInterval(intervalId);
  }, [origin, destination]);

  // Track user's live location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrigin({ lat: latitude, lng: longitude });
        },
        (error) => console.error("Error getting position:", error),
        { enableHighAccuracy: true, maximumAge: 0 }
      );

      return () => navigator.geolocation.clearWatch(watchId); // clean up
    } else {
      console.error("Geolocation not supported by this browser.");
    }
  }, []);

  return <div ref={mapRef} className="w-full h-full"></div>;
};

export default DoubleTracking;
