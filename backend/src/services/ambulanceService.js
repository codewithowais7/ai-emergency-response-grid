/**
 * ambulanceService.js — Fleet management operations.
 */

import * as ambulanceData from '../data/ambulances.js';

export const getAllAmbulances = (status) => {
    const all = ambulanceData.getAll();
    if (status) return all.filter((a) => a.status === status);
    return all;
};

export const getAmbulance = (id) => ambulanceData.getById(id);

export const updateAmbulanceStatus = (id, status) => ambulanceData.updateStatus(id, status);

export const updateAmbulanceLocation = (id, lat, lng) => ambulanceData.updateLocation(id, lat, lng);
