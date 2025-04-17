const {
    getToken
} = require('../services/jwt');
const Captain = require('../models/captainModel');
const Blacklist = require('../models/tokenBlacklist');

async function checkCaptainAuthentication(req, res, next) {
    try {
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

        
            const captainId = getToken(token);

            const captain = await Captain.findById(captainId._id);

            req.captain = captain;

            return next();

    } 
    catch (error) {
        return res.status(401).send({
            message: error
        })    
    }
}

module.exports = {
    checkCaptainAuthentication
}