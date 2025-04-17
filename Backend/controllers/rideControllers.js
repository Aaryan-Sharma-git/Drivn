const Ride = require('../models/rideModel')
const Captain = require('../models/captainModel')
const {getFare, generateOTP} = require('../services/rideServices');
const {getDistanceAndTime, findCaptainsNearby, getCoordinates} = require('../services/map');
const {validationResult} = require('express-validator');
const {getSocketInstance} = require('../socket')

async function handleRideCreate(req, res) {
    
    const result = validationResult(req);
    const io = getSocketInstance();


    if(result.isEmpty()){
        const body = req.body;
        const user = req.user;

        try {
            const fare = await getFare(body.pickup, body.destination);
            const otp = generateOTP(4);
            const distanceTime =  await getDistanceAndTime(body.pickup, body.destination);

            const newDuration = distanceTime.duration.substring(0, distanceTime.duration.length-1);

            const ride = await Ride.create({
                user: user._id,
                pickup: body.pickup,
                destination: body.destination,
                vehicleType: body.vehicleType,
                distance: (distanceTime.distanceMeters)/1000,
                duration: (Number(newDuration)/60).toFixed(2),
                fare: fare[body.vehicleType],
                otp: otp,
            })

            const userPopulatedRide = await Ride.findById(ride._id).populate('user');
            userPopulatedRide.otp = "";

            const pickupCoordinates = await getCoordinates(body.pickup);

            if (pickupCoordinates) {
                const nearbyCaptains = await findCaptainsNearby(pickupCoordinates.lng, pickupCoordinates.lat, 5000, body.vehicleType);

                if (nearbyCaptains.length > 0) {
                    nearbyCaptains.forEach((element) => {
                        io.to(element.socketId).emit('ride-confirm', userPopulatedRide);
                    });
                }

            } else {
                console.log("Pickup coordinates not found.");
            }

            return res.status(201).send(userPopulatedRide);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: 'Internal server error' });
        }
    }

    return res.send({
        error: result.array()
    }) 
    
}

async function handleRideFare(req, res) {
    const result = validationResult(req);

    if(result.isEmpty()){
        const initial = req.query.initial;
        const final = req.query.final;

        try {
            const fare = await getFare(initial, final);

            return res.status(200).send({
                fare: fare
            });
        } catch (error) {
            console.log(error);
        }
    }

    return res.send({
        error: result.array()
    })
}

async function handleConfirmPopup(req, res) {
    const result = validationResult(req);
    const io = getSocketInstance();

    if(result.isEmpty()){
        try {
            const body = req.body;

            const ride = await Ride.findByIdAndUpdate(body.rideId, {
                captain: body.captainId
            })

            const userCaptainPopulatedRide = await Ride.findById(body.rideId).select('+otp').populate('captain').populate('user');
            
            const rideAccepted = await Ride.findByIdAndUpdate(body.rideId, {
                status: 'accepted'
            })

            const captainActive = await Captain.findByIdAndUpdate(body.captainId, {
                status: 'Active'
            })

            if(io){
                io.to(userCaptainPopulatedRide.user.socketId).emit('confirm-popup', userCaptainPopulatedRide);
            }
            else{
                console.log('io not initialized');
                return null;
            }

            return res.status(200).json({
                msg: 'ride confirmed and driver found',
                ride: ride
            })

        
        } catch (error) {
            console.log(error)
        }
    }

    return res.send({
        error: result.array()
    })
}

async function handleVerifyOtp(req, res) {
    const result = validationResult(req);
    const io = getSocketInstance();

    if(result.isEmpty()){
        try {
            const body = req.body;

            const ride = await Ride.findById(body.ride._id).select('+otp').populate('user').populate('captain');

            const rideOngoing = await Ride.findByIdAndUpdate(body.ride._id, {
                status: 'ongoing'
            })

            if(ride.otp !== body.otp){
                return new Error('otp not matching');
            }

            ride.otp = "";
            io.to(ride.user.socketId).emit('otp-verified', ride);

            return res.status(200).json({
                msg: 'otp matched',
                ride: ride
            })

        } catch (error) {
            console.log(error);
        }
    }

    return res.send({
        error: result.array()
    })
}

async function handleCompleteRide(req, res) {
    const result = validationResult(req);
    const io = getSocketInstance();

    if(result.isEmpty()){
        const body = req.body;
        try {
            const populatedRide = await Ride.findById(body.ride._id).populate('user').populate('captain');
            const rideCompleted = await Ride.findByIdAndUpdate(body.ride._id, {
                status: 'completed'
            });
            const captainInactive = await Captain.findByIdAndUpdate(populatedRide.captain._id, {
                status: 'InActive'
            })

            if(io){
                io.to(populatedRide.user.socketId).emit('complete-ride', 200);
            }
            else{
                console.log('io is not initialized');
            }

            return res.status(200).json({
                msg: 'ride was successful'
            })
        } catch (error) {
            console.log(error);
        }
    }

    return res.send({
        error: result.array()
    })
}

module.exports = {
    handleRideCreate,
    handleRideFare,
    handleConfirmPopup,
    handleVerifyOtp,
    handleCompleteRide
}