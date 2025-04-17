const {getDistanceAndTime} = require('../services/map');
const {randomInt} = require('crypto');

async function getFare(pickup, destination) {
    if(!pickup || !destination){
        throw new Error('Either pickup or destination is empty.');
    }

    try {
        const distanceTime = await getDistanceAndTime(pickup, destination);

        const baseFare = {
            auto: 30,
            car: 50,
            bike: 20
        };
    
        const perKmRate = {
            auto: 10,
            car: 15,
            bike: 8
        };
    
        const perMinuteRate = {
            auto: 2,
            car: 3,
            bike: 1.5
        };
        
        const newDuration = distanceTime.duration.substring(0, distanceTime.duration.length-1)

        const fare = {
            auto: Math.round(baseFare.auto + ((distanceTime.distanceMeters / 1000) * perKmRate.auto) + ((Number(newDuration)/60) * perMinuteRate.auto)),
            car: Math.round(baseFare.car + ((distanceTime.distanceMeters / 1000) * perKmRate.car) + ((Number(newDuration)/60) * perMinuteRate.car)),
            bike: Math.round(baseFare.bike + ((distanceTime.distanceMeters / 1000) * perKmRate.bike) + ((Number(newDuration)/60) * perMinuteRate.bike))
        };
    
        return fare;

    } catch (error) {
        console.log(error);
    }
}

function generateOTP(length = 4) {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = randomInt(0, digits.length);
        otp += digits[randomIndex];
    }
    return otp;
}

module.exports = {
    getFare,
    generateOTP
}