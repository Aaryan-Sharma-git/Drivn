import { useEffect, useRef, useState } from "react";
import { loadGoogleMapsScript } from "../utils/loadGoogleMaps";

function SingleTracking() {
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Load Google Maps script
  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        setIsScriptLoaded(true)
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
            const currentLocation = { lat: latitude, lng: longitude };
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

  // Initialize map and marker
  useEffect(() => {
    if (!isScriptLoaded || !origin) return;

    async function initMap() {
      const { Map } = await window.google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

      const map = new Map(mapRef.current, {
        zoom: 14,
        center: origin,
        mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
      });

      const marker = new AdvancedMarkerElement({
        map: map,
        position: origin,
        title: "Current Location",
      });
    }

    initMap();
  }, [isScriptLoaded, origin]);

  return (
    <div className="h-full w-full">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}

export default SingleTracking;