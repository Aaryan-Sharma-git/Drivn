const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },

    pickup: {
        type: String,
        required: true,
    },

    destination: {
        type: String,
        required: true
    },

    vehicleType: {
        type: String,
        required: true
    },

    distance: {
        type: Number,
    },

    duration: {
        type: String,
    },

    fare: {
        type: Number,
    },

    otp:{
        type: String,
        select: false,
        required: true
    },

    status:{
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },

    startedAt: {
        type: Date,
        default: Date.now
    },

    paymentId: {
        type: String,
    },

    orderId: {
        type: String,
    },

    signature: {
        type: String,
    }
})

const Ride = mongoose.model("ride", rideSchema);

module.exports = Ride;