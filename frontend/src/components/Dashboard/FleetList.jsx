/**
 * FleetList.jsx — Fleet panel with status filter tabs.
 */

import { useState, useMemo, memo, useCallback } from 'react';
import FleetItem from './FleetItem.jsx';

const FILTERS = [
    { key: 'all', label: 'All', icon: '🚑' },
    { key: 'available', label: 'Available', icon: '🟢' },
    { key: 'dispatched', label: 'Dispatched', icon: '🔴' },
    { key: 'offline', label: 'Offline', icon: '⚫' },
];

function FleetList({ ambulances, onSelect }) {
    const [filter, setFilter] = useState('all');

    const filtered = useMemo(() => {
        if (filter === 'all') return ambulances;
        return ambulances.filter((a) => a.status === filter);
    }, [ambulances, filter]);

    const handleSelect = useCallback((amb) => {
        onSelect?.(amb);
    }, [onSelect]);

    return (
        <div className="fleet-panel">
            <div className="fleet-panel__header">
                <h3 className="fleet-panel__title">🚑 Ambulance Unit Status</h3>
                <span className="fleet-panel__count">{filtered.length} / {ambulances.length}</span>
            </div>

            <div className="fleet-panel__filters">
                {FILTERS.map((f) => (
                    <button
                        key={f.key}
                        className={`fleet-filter${filter === f.key ? ' fleet-filter--active' : ''}`}
                        onClick={() => setFilter(f.key)}
                    >
                        <span className="fleet-filter__icon">{f.icon}</span>
                        <span className="fleet-filter__label">{f.label}</span>
                    </button>
                ))}
            </div>

            <div className="fleet-panel__list">
                {filtered.length === 0 && (
                    <div className="fleet-panel__empty">
                        <span className="fleet-panel__empty-icon">🕊️</span>
                        <p>No {filter === 'all' ? '' : filter} ambulances found.</p>
                    </div>
                )}
                {filtered.map((amb) => (
                    <FleetItem key={amb.id} ambulance={amb} onSelect={handleSelect} />
                ))}
            </div>
        </div>
    );
}

export default memo(FleetList);
