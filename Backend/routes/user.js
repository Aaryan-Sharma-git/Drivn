const express = require('express');
const userRouter = express.Router();
const {
    handleUserSignUp,
    handleUserLogin,
    handleLogout,
    getUserProfile
} = require('../controllers/userController')
const {body} = require('express-validator');
const {
    checkForAuthentication
} = require('../middlewares/userAuth');
const upload = require('../middlewares/multer')


userRouter
.post('/', upload.single('profilePic'),  body('firstname').notEmpty().isLength({ min: 3 }).withMessage('Name must contain atleast 3 characters'),
            body('phoneNumber').notEmpty().withMessage('phone number is required').matches(/^\+\d{1,4}-\d{7,12}$/).withMessage('Phone number must follow this pattern +91-XXXXXXXXXX.'),
            body('email').notEmpty().isEmail().withMessage('Invalid Email'),
            body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must contain atleast 8 characters'),
handleUserSignUp);

userRouter
.post('/login', body('email').notEmpty().isEmail().withMessage('Invalid Email'),
                body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must contain atleast 8 characters'),
handleUserLogin);

userRouter
.get('/logout', checkForAuthentication, handleLogout);

userRouter
.get('/profile', checkForAuthentication, getUserProfile);

module.exports = userRouter;