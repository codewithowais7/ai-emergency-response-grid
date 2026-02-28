/**
 * TrackingPage.jsx — Family live-tracking page.
 */

import { useState, useMemo, useCallback } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { transformCallSign } from '../utils/callSignFormatter.js';
import MapContainer from '../components/Map/MapContainer.jsx';
import AmbulanceMarker from '../components/Map/AmbulanceMarker.jsx';
import RoutePolyline from '../components/Map/RoutePolyline.jsx';
import CountdownCard from '../components/Dashboard/CountdownCard.jsx';
import DispatchSelectorCard from '../components/Tracking/DispatchSelectorCard.jsx';
import DispatchDetailsCard from '../components/Tracking/DispatchDetailsCard.jsx';
import LiveIndicator from '../components/Dashboard/LiveIndicator.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorDisplay from '../components/common/ErrorDisplay.jsx';

export default function TrackingPage({ ambulances, alerts, loading, error, refetch }) {
    const [selectedAlertId, setSelectedAlertId] = useState(null);

    const handleSelect = useCallback((id) => setSelectedAlertId(id), []);

    /* Memoised derived data — MUST be before early returns (rules of hooks) */
    const activeAlerts = useMemo(
        () => (alerts || []).filter((a) => a.status === 'dispatched'),
        [alerts]
    );

    const tracked = useMemo(
        () => activeAlerts.find((a) => a.id === selectedAlertId) || activeAlerts[0] || null,
        [activeAlerts, selectedAlertId]
    );

    const trackedAmb = useMemo(
        () => tracked ? (ambulances || []).find((a) => a.id === tracked.assignedAmbulance?.id) || null : null,
        [tracked, ambulances]
    );

    if (loading) return <LoadingSpinner message="Loading tracking…" />;
    if (error) return <ErrorDisplay title="Tracking Unavailable" message={error} onRetry={refetch} />;

    return (
        <div className="animate-in">
            {/* ── Header ──────────────────────────────────── */}
            <div className="dash-header">
                <h2 className="section-title">📍 Family Live Tracking</h2>
                <LiveIndicator />
            </div>

            {activeAlerts.length === 0 ? (
                <div className="glass-panel empty-state">
                    <span className="empty-state__icon">🕊️</span>
                    <h3 className="empty-state__title">No Active Dispatches</h3>
                    <p className="empty-state__text">
                        When an ambulance is dispatched, you can track its live position here.
                    </p>
                </div>
            ) : (
                <div className="tracking-layout">
                    {/* ── Map ───────────────────────────────────── */}
                    <div className="home-layout__map">
                        <MapContainer
                            center={trackedAmb ? [trackedAmb.lat, trackedAmb.lng] : undefined}
                            zoom={15}
                        >
                            {trackedAmb && (
                                <AmbulanceMarker ambulance={trackedAmb} />
                            )}
                            {tracked && (
                                <>
                                    <Marker position={[tracked.latitude, tracked.longitude]}>
                                        <Popup>
                                            <strong>🚨 Emergency Location</strong><br />
                                            {tracked.type?.toUpperCase()} — {tracked.description?.slice(0, 60)}
                                        </Popup>
                                    </Marker>
                                    {trackedAmb && (
                                        <RoutePolyline
                                            origin={{ lat: trackedAmb.lat, lng: trackedAmb.lng }}
                                            destination={{ lat: tracked.latitude, lng: tracked.longitude }}
                                        />
                                    )}
                                </>
                            )}
                        </MapContainer>
                    </div>

                    {/* ── Sidebar ──────────────────────────────── */}
                    <div className="tracking-layout__sidebar">
                        <DispatchSelectorCard
                            alerts={activeAlerts}
                            selectedId={tracked?.id}
                            onSelect={handleSelect}
                        />

                        {tracked && (
                            <CountdownCard
                                etaMinutes={tracked.etaMinutes}
                                createdAt={tracked.createdAt}
                                label={`${transformCallSign(tracked.assignedAmbulance?.callSign)} ETA`}
                            />
                        )}

                        <DispatchDetailsCard
                            tracked={tracked}
                            ambulance={trackedAmb}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
