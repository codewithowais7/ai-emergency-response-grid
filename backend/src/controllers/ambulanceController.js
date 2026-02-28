import * as ambulanceService from '../services/ambulanceService.js';
import { catchAsync } from '../utils/helpers.js';

export const getAllAmbulances = catchAsync(async (req, res) => {
    const { status } = req.query;
    const ambulances = ambulanceService.getAllAmbulances(status);
    res.status(200).json({
        status: 'success',
        results: ambulances.length,
        data: ambulances
    });
});

export const getAmbulance = catchAsync(async (req, res) => {
    const ambulance = ambulanceService.getAmbulance(req.params.id);
    if (!ambulance) {
        return res.status(404).json({ status: 'fail', message: 'Ambulance not found' });
    }
    res.status(200).json({
        status: 'success',
        data: ambulance
    });
});

export const updateStatus = catchAsync(async (req, res) => {
    const ambulance = ambulanceService.updateAmbulanceStatus(req.params.id, req.body.status);
    if (!ambulance) {
        return res.status(404).json({ status: 'fail', message: 'Ambulance not found' });
    }

    const io = req.app.get('io');
    io.emit('ambulance-status-changed', ambulance);
    io.emit('ambulance-fleet', ambulanceService.getAllAmbulances());

    res.status(200).json({
        status: 'success',
        data: ambulance
    });
});

export const updateLocation = catchAsync(async (req, res) => {
    const { lat, lng } = req.body;
    const ambulance = ambulanceService.updateAmbulanceLocation(req.params.id, lat, lng);
    if (!ambulance) {
        return res.status(404).json({ status: 'fail', message: 'Ambulance not found' });
    }

    const io = req.app.get('io');
    io.emit('ambulance-location-updated', ambulance);

    res.status(200).json({
        status: 'success',
        data: ambulance
    });
});
