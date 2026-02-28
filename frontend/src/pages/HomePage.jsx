/**
 * HomePage.jsx — Main command-center page.
 */

import { useState, useCallback, useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import MapContainer from '../components/Map/MapContainer.jsx';
import AmbulanceMarker from '../components/Map/AmbulanceMarker.jsx';
import RoutePolyline from '../components/Map/RoutePolyline.jsx';
import AlertForm from '../components/Alert/AlertForm.jsx';
import AlertPopup from '../components/Alert/AlertPopup.jsx';
import TrafficStatusCard from '../components/Command/TrafficStatusCard.jsx';
import RecentAlertsCard from '../components/Command/RecentAlertsCard.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorDisplay from '../components/common/ErrorDisplay.jsx';

export default function HomePage({ ambulances, alerts, latestAlert, submitAlert, dismissLatest, loading, error, refetch }) {
    const [mapClick, setMapClick] = useState(null);

    /* Stable map click handler */
    const handleMapClick = useCallback((latlng) => {
        setMapClick({ lat: latlng.lat, lng: latlng.lng });
    }, []);

    /* Memoised derived data */
    const hasDispatched = useMemo(
        () => ambulances.some((a) => a.status === 'dispatched'),
        [ambulances]
    );

    const activeRoutes = useMemo(() =>
        alerts
            .filter((al) => al.status === 'dispatched' && al.assignedAmbulance)
            .map((al) => {
                const amb = ambulances.find((a) => a.id === al.assignedAmbulance.id);
                if (!amb) return null;
                return {
                    key: al.id,
                    origin: { lat: amb.lat, lng: amb.lng },
                    destination: { lat: al.latitude, lng: al.longitude },
                };
            })
            .filter(Boolean),
        [alerts, ambulances]
    );

    const dispatchedAlerts = useMemo(
        () => alerts.filter((a) => a.status === 'dispatched'),
        [alerts]
    );

    if (loading) return <LoadingSpinner message="Loading command center…" />;
    if (error) return <ErrorDisplay title="Backend Offline" message={error} onRetry={refetch} />;

    return (
        <div className="home-layout animate-in">
            {/* ── Map Panel ─────────────────────────────────── */}
            <div className="home-layout__map">
                <MapContainer onClick={handleMapClick}>
                    {/* Ambulance markers */}
                    {ambulances.map((amb) => (
                        <AmbulanceMarker key={amb.id} ambulance={amb} />
                    ))}

                    {/* Emergency location markers */}
                    {dispatchedAlerts.map((a) => (
                        <Marker key={`em-${a.id}`} position={[a.latitude, a.longitude]}>
                            <Popup>
                                <strong>🚨 {a.type?.toUpperCase()}</strong><br />
                                {a.description?.slice(0, 80)}
                            </Popup>
                        </Marker>
                    ))}

                    {/* Route polylines */}
                    {activeRoutes.map((r) => (
                        <RoutePolyline key={r.key} origin={r.origin} destination={r.destination} />
                    ))}

                    {/* Click-to-place marker */}
                    {mapClick && (
                        <Marker position={[mapClick.lat, mapClick.lng]}>
                            <Popup>📍 Selected location<br />{mapClick.lat.toFixed(4)}, {mapClick.lng.toFixed(4)}</Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>

            {/* ── Sidebar ────────────────────────────────────── */}
            <div className="home-layout__sidebar">
                <AlertForm onSubmit={submitAlert} mapClickCoords={mapClick} />
                <TrafficStatusCard hasDispatched={hasDispatched} />
                <RecentAlertsCard alerts={alerts} />
            </div>

            {/* ── Alert Popup ──────────────────────────────── */}
            <AlertPopup alert={latestAlert} onDismiss={dismissLatest} />
        </div>
    );
}
