import React, { useEffect, useRef } from 'react'

const SingleTracking = () => {

    const mapRef = useRef();
    const mapInstance = useRef(null);
    const markerInstance = useRef(null);

    useEffect(() => {

        async function initMap() {
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      
            mapInstance.current = new Map(mapRef.current, {
              center: { lat: 23.267080, lng: 77.383278 },
              zoom: 13,
              mapId: `${import.meta.env.GOOGLE_MAPS_MAP_ID}`,
            });

            markerInstance.current = new AdvancedMarkerElement({
                map: mapInstance.current,
                position: { lat: 23.267080, lng: 77.383278 },
                title: "bhopal",
              });

              getUserLocation()
          }

          initMap();
    }, [])

  function getUserLocation() {
    if(navigator.geolocation){
      navigator.geolocation.watchPosition(
        (position) => {

          console.log(position.coords);
          const {latitude, longitude} = position.coords;
          updateLocation(latitude, longitude);
        },
        (error) => {
          console.log("location is not found", error);
        },
        { enableHighAccuracy: true }
      );
    }
    else{
      console.log("gelocation is not supported.")
    }
  }

  function updateLocation(lat, lng) {
    if(mapInstance.current && markerInstance.current){
      const newPosition = { lat, lng };
      mapInstance.current.setCenter(newPosition);
      markerInstance.current.position = newPosition;
    }
    else{
      console.log('map or marker instance is not created.')
    }
  }

  return (
    <div ref={mapRef} className='w-full h-full'></div>
  )
}

export default SingleTracking
