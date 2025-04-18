import React, { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../utility/loadGoogleMaps";

const DoubleTracking = ({ destination }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const [origin, setOrigin] = useState();

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!destination || !mapRef.current) return;

      try {
        const google = await loadGoogleMaps();
        if (!isMounted) return;

        const { Map } = await google.maps.importLibrary("maps");
        const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary("routes");

        const map = new Map(mapRef.current, {
          zoom: 13,
          center: destination,
          disableDefaultUI: true,
        });

        mapInstanceRef.current = map;
        directionsServiceRef.current = new DirectionsService();
        directionsRendererRef.current = new DirectionsRenderer();
        directionsRendererRef.current.setMap(map);
      } catch (error) {
        console.error("Failed to initialize map:", error);
      }
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, [destination]);

  useEffect(() => {
    let isMounted = true;

    if (!origin || !destination) return;

    const tryRenderDirections = () => {
      if (
        !directionsServiceRef.current ||
        !directionsRendererRef.current ||
        !mapInstanceRef.current ||
        !isMounted
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
          if (isMounted) {
            directionsRendererRef.current.setDirections(response);
            console.log("✅ Route rendered");
          }
        })
        .catch((error) => console.error("❌ Directions request failed", error));

      return true;
    };

    const intervalId = setInterval(() => {
      if (tryRenderDirections()) {
        clearInterval(intervalId);
      }
    }, 200);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [origin, destination]);

  useEffect(() => {
    let isMounted = true;

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          if (position && position.coords && isMounted) {
            const { latitude, longitude } = position.coords;
            setOrigin({ lat: latitude, lng: longitude });
          }
        },
        (error) => console.error("Error getting position:", error),
        { enableHighAccuracy: true, maximumAge: 0 }
      );

      return () => {
        isMounted = false;
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation not supported by this browser.");
    }
  }, []);

  return <div ref={mapRef} className="w-full h-full"></div>;
};

export default DoubleTracking;