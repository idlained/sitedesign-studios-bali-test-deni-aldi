// backend/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
    }
});
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.io = io; // <== attach socket to request
    next();
});

app.use('/api', authRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Listen
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Socket connection
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
