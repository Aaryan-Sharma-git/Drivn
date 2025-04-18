let googleMapsPromise = null;

export const loadGoogleMaps = () => {
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      reject(new Error('Google Maps API key is missing in environment variables.'));
      return;
    }

    window.initGoogleMaps = () => {
      resolve(window.google);
      // Clean up the global callback after use
      delete window.initGoogleMaps;
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker,routes&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      delete window.initGoogleMaps;
      reject(new Error('Google Maps script failed to load.'));
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
};