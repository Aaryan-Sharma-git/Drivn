const {Server} = require('socket.io');

const User = require('./models/userModel');
const Captain = require('./models/captainModel');

let io;

function initializeServer(server){
    if(server){
        io = new Server(server, {
            cors: {
                origin: process.env.FRONTEND_BASE_URL,
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        io.on('connection', (socket) => {
            socket.on('join', async (data) => {
                if(data.userType === 'user'){
                    const user = await User.findByIdAndUpdate(data.userId, {socketId: socket.id});
                }
        
                else{
                    const captain = await Captain.findByIdAndUpdate(data.captainId, {socketId: socket.id});
                }
    
            })
        
            socket.on('update-captain-location', async (data) => {
                try {
                    const captainLocation = await Captain.findByIdAndUpdate(data.captainId, {
                        location: {
                            type: "Point",
                            coordinates: [data.location.lng, data.location.lat] // MongoDB expects [longitude, latitude]
                        }
                    }, { new: true });
            
                    // console.log("Captain location updated:", captainLocation);
                } catch (error) {
                    console.error("Error updating captain location:", error);
                }
            });

            socket.on('send-message', (response) => {
                io.to(response.toSocket).emit('recieve-message', response.msg);
            })

            socket.on('socketId-to-captain', async (message) => {
                const captain = await Captain.findById(message.captainId);

                io.to(captain.socketId).emit('socketId-to-captain-from-server', message.socketId)
            })  
            
            socket.on('socketId-to-user', async (message) => {
                const user = await User.findById(message.userId);

                io.to(user.socketId).emit('socketId-to-user-from-server', message.socketId)
            })
        })
    }
}

function getSocketInstance() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

module.exports = {
    initializeServer,
    getSocketInstance
}