const {
    getToken
} = require('../services/jwt');
const User = require('../models/userModel');
const Blacklist = require('../models/tokenBlacklist');

async function checkForAuthentication(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split('Bearer ')[1];

    if(!token){
        return res.status(401).json({
            message: 'UnAuthorized Access!'
        })
    }

    const isBlacklisted = await Blacklist.findOne({token: token});
    if(isBlacklisted){
        return res.status(401).json({
            message: 'UnAuthorized'
        })
    }

    try {
        const userId = getToken(token);

        const user = await User.findById(userId._id);

        req.user = user;

        return next();

    } 
    catch (error) {
        return res.status(401).send({
            message: error
        })    
    }
}

module.exports = {
    checkForAuthentication
}