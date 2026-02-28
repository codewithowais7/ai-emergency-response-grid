import { useState, useEffect } from 'react';

export default function CountdownCard({ etaMinutes, createdAt, label }) {
    const [timeLeft, setTimeLeft] = useState(etaMinutes * 60);

    useEffect(() => {
        // Simple tick every second
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;

    return (
        <div className="countdown-card glass-panel">
            <div className="countdown-card__header">
                <span className="countdown-card__icon">⏳</span>
                <span className="countdown-card__label">{label}</span>
            </div>
            <div className={`countdown-card__timer ${timeLeft < 120 ? 'countdown-card__timer--urgent' : ''}`}>
                {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
            </div>
            <div className="countdown-card__sub">Estimated Arrival</div>
        </div>
    );
}
