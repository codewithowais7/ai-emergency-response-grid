import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

/**
 * Centering controller component.
 */
function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) map.setView(center, zoom || map.getZoom());
    }, [center, zoom, map]);
    return null;
}

/**
 * Click handler component.
 */
function MapEvents({ onClick }) {
    const map = useMap();
    useEffect(() => {
        if (!onClick) return;
        const handler = (e) => onClick(e.latlng);
        map.on('click', handler);
        return () => map.off('click', handler);
    }, [onClick, map]);
    return null;
}

export default function MapContainer({ center = [28.6139, 77.2090], zoom = 13, children, onClick }) {
    return (
        <LeafletMap
            center={center}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <ChangeView center={center} zoom={zoom} />
            <MapEvents onClick={onClick} />
            {children}
        </LeafletMap>
    );
}
