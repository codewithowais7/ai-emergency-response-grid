import { transformCallSign } from '../../utils/callSignFormatter.js';

export default function AmbulanceList({ ambulances, onSelect }) {
    if (!ambulances || ambulances.length === 0) {
        return <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No ambulances loaded.</p>;
    }

    return (
        <div className="amb-list">
            <h3 className="amb-list__title">🚑 Ambulance Unit Status</h3>
            {ambulances.map((amb) => (
                <div
                    key={amb.id}
                    className="amb-item"
                    onClick={() => onSelect?.(amb)}
                    role="button"
                    tabIndex={0}
                >
                    <span className={`amb-item__dot amb-item__dot--${amb.status}`} />
                    <div className="amb-item__info">
                        <div className="amb-item__name">{transformCallSign(amb.callSign)}</div>
                        <div className="amb-item__id">{amb.id}</div>
                    </div>
                    <span className={`amb-item__status amb-item__status--${amb.status}`}>
                        {amb.status}
                    </span>
                </div>
            ))}
        </div>
    );
}
