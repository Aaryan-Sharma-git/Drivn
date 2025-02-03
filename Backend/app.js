require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const {
    connectMongo
} = require('./connection');

connectMongo(process.env.MONGO_URL);

app.use(cors()); 

app.listen(PORT, () => console.log(`Server Started on http://localhost:${PORT}`))