export default function RecentAlertsCard({ alerts }) {
    const recent = alerts.slice(0, 5);

    return (
        <div className="glass-panel recent-alerts" style={{ marginTop: '20px' }}>
            <h3 className="section-title" style={{ fontSize: '0.9rem' }}>📋 Recent Alerts</h3>
            {recent.length === 0 ? (
                <p className="empty-text">No alerts today.</p>
            ) : (
                <div className="recent-list">
                    {recent.map((a) => (
                        <div key={a.id} className="recent-item">
                            <div className="recent-item__id">{a.id}</div>
                            <div className="recent-item__info">
                                <strong>{a.type}</strong>
                                <span>{new Date(a.createdAt).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
