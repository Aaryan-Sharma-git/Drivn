require('dotenv').config()

const express = require('express');
const app = express();


const {createServer} = require('http');

const {initializeServer} = require('./socket')

const userRouter = require('./routes/user');
const captainRouter = require('./routes/captain');
const mapRouter = require('./routes/mapRoutes');
const rideRouter = require('./routes/rideRoutes');

const {checkForAuthentication} = require('./middlewares/userAuth');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const server = createServer(app);

initializeServer(server);

const PORT = process.env.PORT || 3000;

const {
    connectMongo
} = require('./connection');

connectMongo(process.env.MONGO_URL);

app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ["GET", "POST"],
    credentials: true
}))

app.use(express.json())

app.use('/users', userRouter);
app.use('/captains', captainRouter);
app.use('/maps', checkForAuthentication, mapRouter);
app.use('/rides', checkForAuthentication, rideRouter);

server.listen(PORT, () => console.log(`Server Started on http://localhost:${PORT}`));