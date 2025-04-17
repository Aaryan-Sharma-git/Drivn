const express = require('express');
const {body, query} = require('express-validator');
const {handleRideCreate, handleRideFare, handleConfirmPopup, handleVerifyOtp, handleCompleteRide} = require('../controllers/rideControllers')

const rideRouter = express.Router();

rideRouter
.post('/create', body('pickup').notEmpty().isLength({min: 3}).withMessage('pickup address must be atleast 3 characters'), body('destination').notEmpty().isLength({min: 3}).withMessage('destination address must be atleast 3 characters'), body('vehicleType').notEmpty().isIn(['car', 'bike', 'auto']).withMessage('Invalid Vehicle Type'), handleRideCreate);

rideRouter
.get('/fare', query('initial').notEmpty().isLength({min: 3}).withMessage('the initial address must contain atleast 3 characters'), query('final').notEmpty().isLength({min: 3}).withMessage('the final address must contain atleast 3 characters'), handleRideFare);

rideRouter
.post('/confirm-popup', body('captainId').isMongoId().withMessage('invalid Id'), body('rideId').isMongoId().withMessage('invalid Id'), handleConfirmPopup);

rideRouter
.post('/verify-otp', body('otp').isLength({min: 4}).withMessage('Invalid otp'), handleVerifyOtp)

rideRouter
.post('/complete-ride', body('ride').notEmpty().withMessage('ride is absent'), handleCompleteRide)

module.exports = rideRouter;