export default function StatCard({ label, value, colour, icon }) {
    return (
        <div className="stat-card glass-panel" style={{ borderLeft: `4px solid ${colour}` }}>
            <div className="stat-card__icon">{icon}</div>
            <div className="stat-card__content">
                <div className="stat-card__value">{value}</div>
                <div className="stat-card__label">{label}</div>
            </div>
        </div>
    );
}
