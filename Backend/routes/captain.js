const express = require('express');
const captainRouter = express.Router();
const {body, query} = require('express-validator');
const {
    handleCaptainLogin,
    handleCaptainLogout,
    handleCaptainSignup,
    getCaptainProfile,
    getCaptainCoordinates
} = require('../controllers/captainController');
const {
    checkCaptainAuthentication
} = require('../middlewares/captainAuth');
const upload = require('../middlewares/multer')



captainRouter
.post('/', upload.single('profilePic'),  body('firstname').notEmpty().isLength({ min: 3 }).withMessage('Name must contain atleast 3 characters'),
            body('email').notEmpty().isEmail().withMessage('Invalid Email'),
            body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must contain atleast 8 characters'),
            body('color').notEmpty().isLength({ min: 3 }).withMessage('Color must contain atleast 3 characters'),
            body('vehicleNumber').notEmpty().isLength({ min: 3 }).withMessage('Vehicle Number must contain atleast 3 characters'),
            body('capacity').notEmpty().isInt({ min: 1 }).withMessage('Capacity must be atleast 1'),
            body('vehicleType').notEmpty().isIn(['car', 'bike', 'auto']).withMessage('Invalid Vehicle Type'),
            body('phoneNumber').notEmpty().withMessage('phone number is required').matches(/^\+\d{1,4}-\d{7,12}$/).withMessage('Phone number must follow this pattern +91-XXXXXXXXXX.'),
handleCaptainSignup);

captainRouter
.post('/login', body('email').notEmpty().isEmail().withMessage('Invalid Email'),
                body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must contain atleast 8 characters'),
handleCaptainLogin);

captainRouter
.get('/profile', checkCaptainAuthentication, getCaptainProfile);

captainRouter
.get('/logout', checkCaptainAuthentication, handleCaptainLogout);

captainRouter
.get('/get-captain-location', query('captainId').notEmpty().withMessage('CaptainID is not present')  , checkCaptainAuthentication, getCaptainCoordinates)

module.exports = captainRouter;