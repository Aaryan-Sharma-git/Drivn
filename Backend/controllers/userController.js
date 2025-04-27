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

        const isAlreadyExist = await User.findOne({ email: body.email });

        if(isAlreadyExist){
            return res.json({
                message: 'user already exist'
            })
        }

        const hashedPassword = await User.hashPassword(body.password);

        const newUser = await User.create({
            fullname: {
                firstname: body.fullname.firstname,
                lastname: body.fullname.lastname
            },
            email: body.email,
            password: hashedPassword
        })

        const userToken = setToken(newUser);

        return res.status(201).cookie('token', userToken).json({
            created: 'user created successfully!',
            user: newUser,
            token: userToken
        });
    }

    return res.status(400).send({
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

                return res.status(200).cookie('token', userToken).json({
                    message: 'User logged in successfully!',
                    token: userToken,
                    user: user
                })
            }
        }
        return res.status(401).json({
            error: 'Invalid email or password'
        })
    }

    return res.status(400).send({
        errors: result.array()
    });
}

async function handleLogout(req, res) {

    const token = req.cookies.token || req.headers.authorization?.split('Bearer ')[1];

    const BlacklistToken = await Blacklist.create({
        token: token
    })

    console.log(BlacklistToken);

    return res.status(200).clearCookie('token').json({
        message: 'User logged out successfully!'
    });
}

async function getUserProfile(req, res) {
    const user = req.user;
    return res.status(200).json({
        user: user
    });
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
    handleLogout,
    getUserProfile
}