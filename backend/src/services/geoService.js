/**
 * geoService.js — Geospatial logic and ETA calculations.
 */

import { calculateDistance } from '../utils/haversine.js';

const AVG_SPEED_KMH = process.env.AVG_AMBULANCE_SPEED_KMH || 40;

/**
 * Find the nearest available ambulance to a given location.
 */
export function findNearestAmbulance(lat, lng, availableAmbulances) {
    if (!availableAmbulances || availableAmbulances.length === 0) return null;

    let nearest = null;
    let minDistance = Infinity;

    availableAmbulances.forEach((amb) => {
        const dist = calculateDistance(lat, lng, amb.lat, amb.lng);
        if (dist < minDistance) {
            minDistance = dist;
            nearest = { ...amb, distanceKm: parseFloat(dist.toFixed(2)) };
        }
    });

    return nearest;
}

/**
 * Estimate ETA in minutes based on distance and average speed.
 */
export function estimateETA(distanceKm) {
    const hours = distanceKm / AVG_SPEED_KMH;
    const minutes = hours * 60;
    // Add a base delay of 1-3 minutes for dispatch/prep
    return Math.ceil(minutes + 2);
}
