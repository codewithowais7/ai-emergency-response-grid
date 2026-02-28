import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import emergencyRoutes from './routes/emergencyRoutes.js';
import ambulanceRoutes from './routes/ambulanceRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import AppError from './utils/AppError.js';

const app = express();

// 1. Global Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// 2. Routes
app.use('/api/emergencies', emergencyRoutes);
app.use('/api/ambulances', ambulanceRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 3. 404 Handler
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 4. Error Handler
app.use(errorHandler);

export default app;
