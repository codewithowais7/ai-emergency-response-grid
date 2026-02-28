import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import * as ambulanceService from './services/ambulanceService.js';

dotenv.config();

const port = process.env.PORT || 5000;
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*', // In production, restrict this
    }
});

// Attach io to app for use in controllers
app.set('io', io);

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('request-ambulances', () => {
        socket.emit('ambulance-fleet', ambulanceService.getAllAmbulances());
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const server = httpServer.listen(port, () => {
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => process.exit(1));
});
