const axios = require('axios');
const Captain = require('../models/captainModel')

async function getCoordinates(address) {
    if(!address){
        return;
    }
    const encodedAddress = encodeURIComponent(address);

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    try {
        const response = await axios.get(url, {
            withCredentials: true
        });

        if(response.data.status === "OK"){
            const location = response.data.results[0].geometry.location;

            return location;
        } else {
            console.log('Error getting:', response.data.status);
            return null;
        }
    } catch (error) {
        console.log('Error getting coordinates:', error);
        return null;
    }
}

async function getDistanceAndTime(initialAddress, finalAddress){
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes?key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const originCoordinates = await getCoordinates(initialAddress);
    const destinationCoordinates = await getCoordinates(finalAddress);

    if (!originCoordinates || !destinationCoordinates) {
        console.log('Error: Invalid coordinates');
        return null;
    }

    const requestBody = {
        origin: {
            location: {
                latLng: { latitude: originCoordinates.lat, longitude: originCoordinates.lng }
            }
        },
        destination: {
            location: {
                latLng: { latitude: destinationCoordinates.lat, longitude: destinationCoordinates.lng }
            }
        },
        travelMode: "DRIVE",
    };

    try {
        const response = await axios.post(url, requestBody, {
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
                "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
            },
            withCredentials: true
        });

        if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            return route;
        } else {
            console.log('Error: No routes found');
            return null;
        }
    } catch (error) {
        console.log('Error getting distance and time:', error);
        return null;
    }
}

async function getSuggestions(input) {
    const url = `https://places.googleapis.com/v1/places:autocomplete`

    try {
        const requestBody = {
            input: input,
            locationBias: {
                circle: {
                    center: {
                        latitude: 37.7937,
                        longitude: -122.3965
                    },
                    radius: 500.0
                }
            }
        }

        const response = await axios.post(url, requestBody, {
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY
            },
            withCredentials: true
        })

        const array = response.data.suggestions;
        const suggestionArray = [];

        array.map((element) => {
            suggestionArray.push({
                name: element.placePrediction.structuredFormat.mainText.text,
                address: element.placePrediction.structuredFormat.secondaryText.text
            })
        })

        return suggestionArray;

    } catch (error) {
        console.log(error);
    }
}

const findCaptainsNearby = async (longitude, latitude, maxDistanceInMeters, vehicleType) => {
    console.log("Searching for captains near:", { longitude, latitude, maxDistanceInMeters, vehicleType});

    try {
        const captains = await Captain.find({
            "vehicle.vehicleType": vehicleType, 
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [longitude, latitude] },
                    $maxDistance: maxDistanceInMeters
                }
            },
        });

        return captains;
    } catch (error) {
        console.error("Error finding captains:", error);
        return [];
    }
};



module.exports = {
    getCoordinates,
    getDistanceAndTime,
    getSuggestions,
    findCaptainsNearby
}