import { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { transformCallSign } from '../../utils/callSignFormatter.js';

/* ── Colour-coded ambulance icon using a CSS divIcon ──────── */
const COLOURS = {
    available: '#22c55e',  // Emerald 500
    dispatched: '#ef4444', // Red 500
    offline: '#64748b'     // Slate 500
};

const createAmbulanceIcon = (status) => {
    return L.divIcon({
        className: 'custom-ambulance-icon',
        html: `
            <div class="amb-marker amb-marker--${status}" style="background: ${COLOURS[status] || '#fff'}">
                <span class="amb-marker__icon">🚑</span>
                <div class="amb-marker__pulse"></div>
            </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    });
};

export default function AmbulanceMarker({ ambulance }) {
    const icon = useMemo(() => createAmbulanceIcon(ambulance.status), [ambulance.status]);

    return (
        <Marker
            position={[ambulance.lat, ambulance.lng]}
            icon={icon}
        >
            <Popup>
                <div className="ambulance-popup-content">
                    <strong>{transformCallSign(ambulance.callSign)}</strong><br />
                    ID: {ambulance.id}<br />
                    Status: <span style={{ textTransform: 'capitalize' }}>{ambulance.status}</span><br />
                    Lat: {ambulance.lat != null ? ambulance.lat.toFixed(5) : 'Unavailable'}<br />
                    Lng: {ambulance.lng != null ? ambulance.lng.toFixed(5) : 'Unavailable'}
                </div>
            </Popup>
        </Marker>
    );
}
