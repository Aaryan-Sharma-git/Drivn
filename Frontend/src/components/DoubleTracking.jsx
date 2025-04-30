import { useEffect, useRef, useState } from "react";
import { loadGoogleMapsScript } from "../utils/loadGoogleMaps";

function DoubleTracking({ destination }) {
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [Destination, setDestination] = useState(destination);

  // Load Google Maps script
  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        setIsScriptLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading Google Maps script:", error);
      });
  }, []);

  // Update user's current location
  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const currentLocation = `${latitude},${longitude}`;
            setOrigin(currentLocation);
          },
          (error) => {
            console.warn("Error getting location:", error);
          },
          { enableHighAccuracy: true }
        );
      }
    };

    updateLocation();
    const intervalId = setInterval(updateLocation, 10000);

    return () => clearInterval(intervalId);
  }, []);

  // Initialize map and directions
  useEffect(() => {
    if (!isScriptLoaded || !origin || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 14,
      center: { lat: 23.259933, lng: 77.412613 },
    });

    directionsRenderer.setMap(map);

    directionsService
      .route({
        origin: origin,
        destination: `${Destination.lat},${Destination.lng}`,
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + e.message));
  }, [isScriptLoaded, origin, Destination]);

  return (
    <div className="h-full w-full">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}

export default DoubleTracking;