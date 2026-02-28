import { memo } from 'react';
import { transformCallSign } from '../../utils/callSignFormatter.js';

function DispatchDetailsCard({ tracked, ambulance }) {
    if (!tracked || !ambulance) return null;

    const details = [
        { label: 'Ambulance', value: transformCallSign(ambulance.callSign) },
        { label: 'Type', value: tracked.type, capitalize: true },
        { label: 'Distance', value: `${tracked.distanceKm} km` },
        { label: 'Description', value: tracked.description || '—' },
        { label: 'Destination', value: `${tracked.latitude.toFixed(5)}, ${tracked.longitude.toFixed(5)}` },
    ];

    return (
        <div className="glass-panel" style={{ padding: '20px', marginTop: '16px' }}>
            <h3 className="section-title" style={{ fontSize: '0.9rem', marginBottom: '16px' }}>🚛 Dispatch Details</h3>
            <div className="dispatch-details-grid">
                {details.map((d) => (
                    <div key={d.label} className="dispatch-detail">
                        <span className="dispatch-detail__label">{d.label}</span>
                        <span className={`dispatch-detail__value ${d.capitalize ? 'text-caps' : ''}`}>
                            {d.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(DispatchDetailsCard);
