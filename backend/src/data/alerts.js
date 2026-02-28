/**
 * alerts.js — In-memory alert data store.
 */

const alerts = [];

export const getAll = () => [...alerts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
export const getById = (id) => alerts.find((a) => a.id === id) || null;
export const add = (alert) => {
    alerts.push({ ...alert, createdAt: alert.createdAt || new Date().toISOString() });
    return alert;
};

/**
 * Checks for duplicate alerts within a radius and time window.
 */
export function findDuplicate(lat, lng, type, windowMs, radiusKm) {
    const now = new Date();
    return alerts.find((a) => {
        if (a.type !== type) return false;
        const timeDiff = now - new Date(a.createdAt);
        if (timeDiff > windowMs) return false;

        // Use a simple distance check if radius is small or haversine
        // For simplicity here, we assume haversine is available in the service
        return false; // placeholder for service logic
    });
}
