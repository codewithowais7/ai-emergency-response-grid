import * as emergencyService from '../services/emergencyService.js';
import { catchAsync } from '../utils/helpers.js';

export const createEmergency = catchAsync(async (req, res) => {
    const { alert, nearest, etaMinutes } = await emergencyService.createEmergency(req.body);

    // Emit socket events
    const io = req.app.get('io');
    io.emit('new-alert', alert);
    io.emit('ambulance-dispatched', {
        ambulanceId: nearest.id,
        callSign: nearest.callSign,
        alertId: alert.id,
        destination: { lat: alert.latitude, lng: alert.longitude },
        etaMinutes
    });

    res.status(201).json({
        status: 'success',
        data: alert
    });
});

export const getAllAlerts = catchAsync(async (req, res) => {
    const alerts = emergencyService.getAllAlerts();
    res.status(200).json({
        status: 'success',
        results: alerts.length,
        data: alerts
    });
});
