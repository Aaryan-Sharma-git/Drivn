const {validationResult} = require('express-validator');
const {getCoordinates, getDistanceAndTime, getSuggestions} = require('../services/map')

async function handleGetCoordinates(req, res) {

    const result = validationResult(req);

    if(result.isEmpty()){
        try {
            const address = req.query.address;

            const location = await getCoordinates(address);

            return res.status(200).send(location)
        } catch (error) {
            console.log(error);
        }
    }

    return res.status(400).send({
        error: result.array()
    })
    
}

async function handleGetDistanceTime(req, res) {
    const result = validationResult(req);

    if(result.isEmpty()){
        try {
            const initialAddress = req.query.initial;
            const finalAddress = req.query.final;

            const route = await getDistanceAndTime(initialAddress, finalAddress);

            const newDuration = route.duration.substring(0, route.duration.length-1)


            return res.status(200).json({
                distance: route.distanceMeters/1000,
                time: (Number(newDuration)/60).toFixed(1)
            })
        } catch (error) {
            console.log(error);
        }
    }

    return res.status(400).send({
        error: result.array()
    })
}

async function handleGetSuggestions(req, res) {
    const result = validationResult(req);

    if(result.isEmpty()){
        try {
            const input = req.query.input;
            const suggestionArray = await getSuggestions(input);

            return res.status(200).send(suggestionArray);
        } catch (error) {
            console.log(error);
        }
    }
    return res.status(400).send({
        error: result.array()
    })
}

module.exports = {
    handleGetCoordinates,
    handleGetDistanceTime,
    handleGetSuggestions
}