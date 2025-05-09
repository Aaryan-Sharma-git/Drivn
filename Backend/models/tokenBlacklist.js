const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 
    }
});

const Blacklist = mongoose.model('blacklist', blacklistSchema);

module.exports = Blacklist;