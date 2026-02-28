import { useState, memo, useCallback } from 'react';
import { transformCallSign } from '../../utils/callSignFormatter.js';

function FleetItem({ ambulance, onSelect }) {
    const [expanded, setExpanded] = useState(false);

    const handleClick = useCallback(() => {
        setExpanded((prev) => !prev);
        onSelect?.(ambulance);
    }, [ambulance, onSelect]);

    return (
        <div
            className={`fleet-item fleet-item--${ambulance.status}${expanded ? ' fleet-item--expanded' : ''}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            <div className="fleet-item__row">
                <span className={`fleet-item__dot fleet-item__dot--${ambulance.status}`} />
                <div className="fleet-item__info">
                    <div className="fleet-item__name">{transformCallSign(ambulance.callSign)}</div>
                    <div className="fleet-item__id">{ambulance.id}</div>
                </div>
                <span className={`fleet-item__status fleet-item__status--${ambulance.status}`}>
                    {ambulance.status}
                </span>
            </div>

            {expanded && (
                <div className="fleet-item__details animate-in">
                    <div className="fleet-detail">
                        <span className="fleet-detail__label">Location:</span>
                        <span className="fleet-detail__value">{ambulance.lat.toFixed(4)}, {ambulance.lng.toFixed(4)}</span>
                    </div>
                    <div className="fleet-detail">
                        <span className="fleet-detail__label">Last Update:</span>
                        <span className="fleet-detail__value">{new Date(ambulance.lastUpdated).toLocaleTimeString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(FleetItem);
