import { Polyline } from 'react-leaflet';

export default function RoutePolyline({ origin, destination }) {
    if (!origin || !destination) return null;

    const path = [
        [origin.lat, origin.lng],
        [destination.lat, destination.lng]
    ];

    return (
        <Polyline
            positions={path}
            pathOptions={{
                color: 'var(--blue)',
                weight: 4,
                opacity: 0.6,
                dashArray: '10, 10',
                lineJoin: 'round'
            }}
        />
    );
}
