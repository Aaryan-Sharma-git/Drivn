const {validationResult} = require('express-validator');
const Captain = require('../models/captainModel')
const {
    setToken
} = require('../services/jwt');
const Blacklist = require('../models/tokenBlacklist');
const {fileUploading} = require('../cloudinary');

async function handleCaptainSignup(req, res) {
    const result = validationResult(req);

    if(result.isEmpty()){
        const body = req.body;
        const file = req.file;

        const isAlreadyExist = await Captain.findOne({ email: body.email });

        if(isAlreadyExist){
            return res.json({
                message: 'captain already exist'
            })
        }

        const hashedPassword = await Captain.hashPassword(body.password);

        if(file){
            const response = await fileUploading(file.path);

            const newCaptain = await Captain.create({
                profilePic: response.secure_url,
                fullname: {
                    firstname: body.firstname,
                    lastname: body.lastname
                },
                email: body.email,
                password: hashedPassword,
                vehicle: {
                    color: body.color,
                    vehicleNumber: body.vehicleNumber,
                    capacity: body.capacity,
                    vehicleType: body.vehicleType
                }
            })

            const captainToken = setToken(newCaptain);

            return res.status(201).cookie('token', captainToken).json({
                created: 'captain created successfully!',
                token: captainToken,
                captain: newCaptain
            });
        }

        const newCaptain = await Captain.create({
            fullname: {
                firstname: body.fullname.firstname,
                lastname: body.fullname.lastname
            },
            email: body.email,
            password: hashedPassword,
            vehicle: {
                color: body.vehicle.color,
                vehicleNumber: body.vehicle.vehicleNumber,
                capacity: body.vehicle.capacity,
                vehicleType: body.vehicle.vehicleType
            }
        })

        const captainToken = setToken(newCaptain);

        return res.status(201).cookie('token', captainToken).json({
            created: 'captain created successfully!',
            token: captainToken,
            captain: newCaptain
        });
    }

    return res.status(400).send({
        errors: result.array()
    })
}

async function handleCaptainLogin(req, res) {
    const result = validationResult(req);

    if(result.isEmpty()){
        const body = req.body;

        const captain = await Captain.findOne({email: body.email}).select("+password");

        if(captain){
            const result = await captain.comparePassword(body.password);

            if(result){
                const captainToken = setToken(captain);

                return res.status(200).cookie('token', captainToken).json({
                    message: 'captain logged in successfully!',
                    token: captainToken,
                    captain: captain
                }) 
            }
        }
        return res.status(401).json({
            error: 'Invalid email or password',
        })
    }

    return res.status(400).send({
        errors: result.array()
    });
}

async function handleCaptainLogout(req, res) {

    const token = req.cookies.token || req.headers.authorization?.split('Bearer ')[1];

    const BlacklistToken = await Blacklist.create({
        token: token
    })

    return res.clearCookie('token').json({
        message: 'captain logged out successfully!'
    });
}

async function getCaptainProfile(req, res) {
    const captain = req.captain;
    return res.status(200).json({
        captain: captain
    });
}

module.exports = {
    handleCaptainLogin,
    handleCaptainSignup,
    handleCaptainLogout,
    getCaptainProfile
}