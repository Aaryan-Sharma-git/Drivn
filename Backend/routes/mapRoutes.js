const express = require('express');
const mapRouter = express.Router();
const {handleGetCoordinates, handleGetDistanceTime, handleGetSuggestions} = require('../controllers/mapControllers');
const {query} = require('express-validator');

mapRouter
.get('/get-coordinates', query('address').notEmpty().isLength({min: 3}).withMessage('the address must contain atleast 3 characters'), handleGetCoordinates);

mapRouter
.get('/get-distance-time', query('initial').notEmpty().isLength({min: 3}).withMessage('the initial address must contain atleast 3 characters'), query('final').notEmpty().isLength({min: 3}).withMessage('the final address must contain atleast 3 characters'), handleGetDistanceTime);

mapRouter
.get('/get-suggestions', query('input').notEmpty().isLength({min: 1}).withMessage('the input must contain atleast 1 characters'), handleGetSuggestions)

module.exports = mapRouter;