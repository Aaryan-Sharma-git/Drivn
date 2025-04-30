const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
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
    },

    status: {
        type: String,
        enum: ['Active', 'InActive'],
        default: 'InActive'
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'color must be of atleast 3 characters']
        },

        vehicleNumber: {
            type: String,
            required: true,
            minlength: [3, 'Vehicle Number must be of atleast 3 characters']
        },

        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be atleast 1']
        },

        vehicleType: {
            type: String,
            enum: ['car', 'bike', 'auto'],
            required: true,
        }
    },

    captainProgress: {
        timeWorked: {
            type: Number,
            default: 0
        },

        amountEarned: {
            type: Number,
            default: 0
        },

        jobsDone: {
            type: Number,
            default: 0
        },

        distanceTravelled: {
            type: Number,
            default: 0
        }
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // [longitude, latitude],
            required: true,
            default: [78.9629, 20.5937]
        }
    }
});

captainSchema.index({ location: "2dsphere" });

captainSchema.methods.comparePassword = async function(password) {
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } 
    catch (error) { 
        throw error;
    }
}

captainSchema.statics.hashPassword = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10); 
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } 
    catch (error) {
        throw error;
    }
}

const Captain = mongoose.model('captain', captainSchema);

module.exports = Captain