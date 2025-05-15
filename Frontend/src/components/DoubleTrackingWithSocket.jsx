import { useContext, useEffect, useRef, useState } from "react";
import { loadGoogleMapsScript } from "../utils/loadGoogleMaps";
import axios from "axios";

function DoubleTracking({ ride, originCoords }) {
  const mapRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [Destination, setDestination] = useState(null);

  useEffect(() => {
    async function getDestinationCoordinates() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/get-captain-location?captainId=${ride.captain._id}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });
        
        if(response.status === 200){
          setDestination(response.data);
        }
      } catch (error) {
          console.log(error);
      }
    }

    getDestinationCoordinates();

    const intervalId = setInterval(getDestinationCoordinates, 10000);

    return () => clearInterval(intervalId);
  }, [])

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

  // Initialize map and directions
  useEffect(() => {

    if (!isScriptLoaded || !originCoords || !Destination) {
      return;
    };

    try {
      
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 14,
        center: { lat: 23.259933, lng: 77.412613 },
      });

      directionsRenderer.setMap(map);

      directionsService
        .route({
          origin: `${originCoords.lat},${originCoords.lng}`,
          destination: `${Destination.lat},${Destination.lng}`,
          travelMode: window.google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + e.message));
      }
      catch(error){
        console.log(error);
      }
  }, [isScriptLoaded, originCoords, Destination]);

  return (
    <div className="h-full w-full">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}

export default DoubleTracking;