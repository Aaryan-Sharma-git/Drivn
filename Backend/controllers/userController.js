const {validationResult} = require('express-validator');
const User = require('../models/userModel');
const {
    setToken
} = require('../services/jwt');
const Blacklist = require('../models/tokenBlacklist')

async function handleUserSignUp(req, res) {
    const result = validationResult(req);

    if(result.isEmpty()){
        const body = req.body;

        const hashedPassword = await User.hashPassword(body.password);

        const newUser = await User.create({
            fullname: {
                firstname: body.firstname,
                lastname: body.lastname
            },
            email: body.email,
            password: hashedPassword
        })

        console.log(newUser);

        const userToken = setToken(newUser);

        return res.status(201).cookie('token', userToken).json({
            created: 'user created successfully!'
        });
    }

    return res.send({
        errors: result.array()
    })
}

async function handleUserLogin(req, res) {
    const result = validationResult(req);

    if(result.isEmpty()){
        const body = req.body;

        const user = await User.findOne({email: body.email});

        if(user){
            const result = await user.comparePassword(body.password);

            if(result){
                const userToken = setToken(user);

                return res.cookie('token', userToken).json({
                    message: 'User logged in successfully!'
                })
            }
        }
        return res.status(401).json({
            error: 'Invalid email or password'
        })
    }

    return res.send({
        errors: result.array()
    });
}

async function handleLogout(req, res) {

    const token = req.cookies.token || req.headers.authorization?.split('Bearer ')[1];

    const BlacklistToken = await Blacklist.create({
        token: token
    })

    console.log(BlacklistToken);

    return res.clearCookie('token').json({
        message: 'User logged out successfully!'
    });
}

async function getUserProfile(req, res) {
    const user = req.user;
    return res.json({
        user: user
    });
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
    handleLogout,
    getUserProfile
}