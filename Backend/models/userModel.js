const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    profilePic: {
        type: String,
        default: 'https://res.cloudinary.com/dvkyzz0je/image/upload/v1745931696/sefifcecuqlvjnrbnn2e.jpg'
    },

    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be of atleast 3 characters"]
        },
        lastname: {
            type: String,
            minlength: [3, "last name must be of atleast 3 characters"]
        }
    },

    phoneNumber: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be of atleast 5 characters"]
    },

    password: {
        type: String,
        required: true,
    },

    socketId: {
        type: String
    }
})

userSchema.methods.comparePassword = async function(password) {
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } 
    catch (error) { 
        throw error;
    }
}

userSchema.statics.hashPassword = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10); 
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } 
    catch (error) {
        throw error;
    }
}

const User = mongoose.model("user", userSchema);

module.exports = User;