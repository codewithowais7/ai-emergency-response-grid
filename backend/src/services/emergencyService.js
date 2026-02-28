/**
 * emergencyService.js — Lifecycle of emergency alerts and dispatching.
 */

import * as alertData from '../data/alerts.js';
import * as ambulanceService from './ambulanceService.js';
import * as geoService from './geoService.js';
import AppError from '../utils/AppError.js';

/**
 * Processes a new emergency alert: dedupes, finds nearest ambulance, and dispatches.
 */
export async function createEmergency(alertDataInput) {
    const { latitude, longitude, type, description, callerName } = alertDataInput;

    // 1. Basic duplicate check (simplified)
    // In a full app, we'd use alertData.findDuplicate(...)

    // 2. Find available units
    const available = ambulanceService.getAllAmbulances('available');
    if (available.length === 0) {
        throw new AppError('No ambulances currently available in the fleet.', 503);
    }

    // 3. Find nearest unit
    const nearest = geoService.findNearestAmbulance(latitude, longitude, available);
    const etaMinutes = geoService.estimateETA(nearest.distanceKm);

    // 4. Create alert record
    const alert = {
        id: `ALE-${Date.now().toString().slice(-6)}`,
        type,
        description,
        latitude,
        longitude,
        callerName,
        status: 'dispatched',
        assignedAmbulance: {
            id: nearest.id,
            callSign: nearest.callSign
        },
        distanceKm: nearest.distanceKm,
        etaMinutes,
        createdAt: new Date().toISOString()
    };

    alertData.add(alert);

    // 5. Update ambulance status
    ambulanceService.updateAmbulanceStatus(nearest.id, 'dispatched');

    return { alert, nearest, etaMinutes };
}

export const getAllAlerts = () => alertData.getAll();
export const getAlert = (id) => alertData.getById(id);
