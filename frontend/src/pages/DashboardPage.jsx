/**
 * DashboardPage.jsx — Hospital operations dashboard.
 */

import { useMemo } from 'react';
import { transformCallSign } from '../utils/callSignFormatter.js';
import StatsPanel from '../components/Dashboard/StatsPanel.jsx';
import CountdownCard from '../components/Dashboard/CountdownCard.jsx';
import FleetList from '../components/Dashboard/FleetList.jsx';
import LiveIndicator from '../components/Dashboard/LiveIndicator.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorDisplay from '../components/common/ErrorDisplay.jsx';

export default function DashboardPage({ ambulances, alerts, loading, error, refetch }) {
    if (loading) return <LoadingSpinner message="Loading dashboard…" />;
    if (error) return <ErrorDisplay title="Data Unavailable" message={error} onRetry={refetch} />;

    /* Memoise filtered dispatches */
    const activeDispatches = useMemo(
        () => alerts.filter((a) => a.status === 'dispatched'),
        [alerts]
    );

    return (
        <div className="animate-in">
            {/* ── Header ──────────────────────────────────────── */}
            <div className="dash-header">
                <h2 className="section-title">📊 Hospital Operations Dashboard</h2>
                <LiveIndicator />
            </div>

            {/* ── Stats Grid ──────────────────────────────────── */}
            <StatsPanel ambulances={ambulances} alerts={alerts} />

            <div className="dashboard-layout" style={{ marginTop: '24px' }}>
                {/* ── ETA Countdowns ──────────────────────────────── */}
                <div>
                    <h3 className="section-title" style={{ fontSize: '0.95rem' }}>⏱️ Active ETA Countdowns</h3>

                    {activeDispatches.length === 0 && (
                        <div className="empty-state glass-panel">
                            <span className="empty-state__icon">🕊️</span>
                            <h4 className="empty-state__title">No Active Dispatches</h4>
                            <p className="empty-state__text">
                                When an ambulance is dispatched, the live countdown will appear here.
                            </p>
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {activeDispatches.map((alert) => (
                            <CountdownCard
                                key={alert.id}
                                etaMinutes={alert.etaMinutes}
                                createdAt={alert.createdAt}
                                label={`${transformCallSign(alert.assignedAmbulance?.callSign) || 'Unknown'} → ${alert.type?.toUpperCase()}`}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Ambulance Unit List ──────────────────────────────────── */}
                <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column' }}>
                    <FleetList ambulances={ambulances} />
                </div>
            </div>

            {/* ── Alert History ─────────────────────────────────── */}
            <div style={{ marginTop: '24px' }}>
                <h3 className="section-title" style={{ fontSize: '0.95rem' }}>📋 Alert History</h3>
                <div className="glass-panel alert-history">
                    {alerts.length === 0 && (
                        <div className="empty-state" style={{ padding: '28px' }}>
                            <span className="empty-state__icon">📭</span>
                            <p className="empty-state__text">No alerts recorded yet.</p>
                        </div>
                    )}
                    <table className="alert-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Ambulance</th>
                                <th>Distance</th>
                                <th>ETA</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alerts.map((a) => (
                                <tr key={a.id}>
                                    <td className="alert-table__id">{a.id}</td>
                                    <td className="alert-table__type">{a.type}</td>
                                    <td>{transformCallSign(a.assignedAmbulance?.callSign) || '—'}</td>
                                    <td>{a.distanceKm} km</td>
                                    <td className="alert-table__eta">{a.etaMinutes} min</td>
                                    <td className="alert-table__time">
                                        {new Date(a.createdAt).toLocaleTimeString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
