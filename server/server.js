const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');



const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
app.use(cors({
    origin: "http://localhost:3000"
}));
// Middleware
app.use(express.json());

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (data) => {
        io.emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});