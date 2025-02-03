const mongoose = require('mongoose');

const connectMongo = (URL) => {
    return mongoose.connect(URL)
    .then(() => console.log('Mongo Connected!'))
    .catch((error) => console.log(error));
}

module.exports = {
    connectMongo
}