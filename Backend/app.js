require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000;

const {
    connectMongo
} = require('./connection');

connectMongo(process.env.MONGO_URL);

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

app.use('/users', userRouter);

app.listen(PORT, () => console.log(`Server Started on http://localhost:${PORT}`))