/**
 * StatsPanel.jsx — Dashboard statistics grid.
 */

import { useMemo, memo } from 'react';
import StatCard from './StatCard.jsx';

function StatsPanel({ ambulances, alerts }) {
    const stats = useMemo(() => {
        const total = ambulances.length;
        const available = ambulances.filter((a) => a.status === 'available').length;
        const dispatched = ambulances.filter((a) => a.status === 'dispatched').length;
        const offline = ambulances.filter((a) => a.status === 'offline').length;
        const alertCount = alerts.length;

        return [
            { label: 'Total Ambulance Units', value: total, colour: 'var(--blue)', icon: '🚑' },
            { label: 'Available', value: available, colour: 'var(--green)', icon: '✅' },
            { label: 'Dispatched', value: dispatched, colour: 'var(--red)', icon: '🔴' },
            { label: 'Offline', value: offline, colour: 'var(--text-muted)', icon: '⚫' },
            { label: 'Total Alerts', value: alertCount, colour: 'var(--amber)', icon: '⚠️' },
        ];
    }, [ambulances, alerts]);

    return (
        <div className="stats-grid animate-in">
            {stats.map((s) => (
                <StatCard
                    key={s.label}
                    label={s.label}
                    value={s.value}
                    colour={s.colour}
                    icon={s.icon}
                />
            ))}
        </div>
    );
}

export default memo(StatsPanel);
