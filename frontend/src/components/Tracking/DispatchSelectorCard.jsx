import { memo, useCallback } from 'react';
import { transformCallSign } from '../../utils/callSignFormatter.js';

function DispatchItem({ alert, isActive, onSelect }) {
    const handleClick = useCallback(() => onSelect(alert.id), [alert.id, onSelect]);

    return (
        <div
            className={`dispatch-item${isActive ? ' dispatch-item--active' : ''}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            <div className="dispatch-item__top">
                <strong className="dispatch-item__callsign">{transformCallSign(alert.assignedAmbulance?.callSign)}</strong>
                <span className="dispatch-item__type">{alert.type}</span>
            </div>
            <div className="dispatch-item__id">{alert.id}</div>
            <div className="dispatch-item__meta">
                <span>📍 {alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}</span>
                <span>⏱️ {alert.etaMinutes} min</span>
            </div>
        </div>
    );
}

function DispatchSelectorCard({ alerts, selectedId, onSelect }) {
    return (
        <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 className="section-title" style={{ fontSize: '0.9rem', marginBottom: '16px' }}>🚨 Active Dispatches</h3>
            <div className="dispatch-list">
                {alerts.map((a) => (
                    <DispatchItem
                        key={a.id}
                        alert={a}
                        isActive={a.id === selectedId}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );
}

export default memo(DispatchSelectorCard);
