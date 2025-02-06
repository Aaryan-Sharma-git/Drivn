const jwt = require('jsonwebtoken');

function setToken(user) {
    const payload = {
        _id: user._id,
        email: user.email
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});
}

function getToken(token){
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    setToken,
    getToken
}