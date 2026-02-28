/**
 * ambulances.js — In-memory ambulance fleet data store.
 *
 * In a production system this would be backed by a database.
 * Each ambulance has a unique id, callSign, GPS location,
 * and a status that drives the dispatch algorithm.
 *
 * Statuses:
 *   'available'  — Ready to respond
 *   'dispatched' — Currently en route / at scene
 *   'offline'    — Out of service
 */

import { getCurrentTimestamp } from '../utils/helpers.js';

/**
 * Seed data — 10 ambulances spread across a metropolitan area.
 * Coordinates are loosely based on central Delhi, India for demo purposes.
 */
const ambulances = [
    { id: 'AMB-001', callSign: '108-DEL-ALS-01', lat: 28.6139, lng: 77.2090, status: 'available', lastUpdated: getCurrentTimestamp() },
    { id: 'AMB-002', callSign: '108-DEL-ALS-02', lat: 28.6280, lng: 77.2195, status: 'available', lastUpdated: getCurrentTimestamp() },
    { id: 'AMB-003', callSign: '102-DEL-BLS-03', lat: 28.5921, lng: 77.2307, status: 'available', lastUpdated: getCurrentTimestamp() },
    { id: 'AMB-004', callSign: 'CATS-DEL-ALS-04', lat: 28.6353, lng: 77.2250, status: 'dispatched', lastUpdated: getCurrentTimestamp() },
    { id: 'AMB-005', callSign: 'CATS-DEL-BLS-05', lat: 28.6508, lng: 77.2340, status: 'available', lastUpdated: getCurrentTimestamp() },
    { id: 'AMB-006', callSign: '108-GGN-ALS-06', lat: 28.5672, lng: 77.2100, status: 'available', lastUpdated: getCurrentTimestamp() },
    { id: 'AMB-007', callSign: '102-GGN-BLS-07', lat: 28.6100, lng: 77.2500, status: 'offline', lastUpdated: getCurrentTimestamp() },
    { id: 'AMB-008', callSign: '108-NOI-ALS-08', lat: 28.6450, lng: 77.1930, status: 'available', lastUpdated: getCurrentTimestamp() },
    { id: 'AMB-009', callSign: '102-NOI-BLS-09', lat: 28.5800, lng: 77.2000, status: 'available', lastUpdated: getCurrentTimestamp() },
    { id: 'AMB-010', callSign: 'EMS-NCR-ALS-10', lat: 28.6200, lng: 77.1850, status: 'available', lastUpdated: getCurrentTimestamp() },
];

// ─── CRUD helpers ──────────────────────────────────────────

export const getAll = () => [...ambulances];
export const getAvailable = () => ambulances.filter((a) => a.status === 'available');
export const getById = (id) => ambulances.find((a) => a.id === id) || null;

/**
 * Update ambulance status. Returns the updated record or null.
 */
export function updateStatus(id, status) {
    const ambulance = ambulances.find((a) => a.id === id);
    if (!ambulance) return null;
    ambulance.status = status;
    ambulance.lastUpdated = getCurrentTimestamp();
    return { ...ambulance };
}

/**
 * Update ambulance GPS location. Returns the updated record or null.
 */
export function updateLocation(id, lat, lng) {
    const ambulance = ambulances.find((a) => a.id === id);
    if (!ambulance) return null;
    ambulance.lat = lat;
    ambulance.lng = lng;
    ambulance.lastUpdated = getCurrentTimestamp();
    return { ...ambulance };
}
