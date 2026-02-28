import { useEffect, useRef } from 'react';
import { transformCallSign } from '../../utils/callSignFormatter.js';

export default function AlertPopup({ alert, onDismiss }) {
    const timerRef = useRef(null);

    useEffect(() => {
        if (!alert) return;

        /* Auto-dismiss after 8 seconds */
        timerRef.current = setTimeout(() => {
            onDismiss?.();
        }, 8000);

        return () => clearTimeout(timerRef.current);
    }, [alert, onDismiss]);

    if (!alert) return null;

    return (
        <div className="alert-popup-wrapper">
            <div className="alert-popup">
                <div className="alert-popup__header">
                    <span className="alert-popup__title">🚨 New Emergency</span>
                    <button className="alert-popup__close" onClick={onDismiss}>✕</button>
                </div>
                <div className="alert-popup__body">
                    <strong>{alert.type?.toUpperCase()}</strong> — {alert.description}
                    <br />
                    Assigned: {transformCallSign(alert.assignedAmbulance?.callSign) || 'N/A'}
                </div>
                <div className="alert-popup__eta">
                    ETA: {alert.etaMinutes} min • {alert.distanceKm} km
                </div>
            </div>
        </div>
    );
}
