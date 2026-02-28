export default function TrafficStatusCard({ hasDispatched }) {
    return (
        <div className="glass-panel traffic-card" style={{ marginTop: '20px' }}>
            <h3 className="section-title" style={{ fontSize: '0.9rem' }}>🚦 Traffic Signal Priority</h3>
            <div className="traffic-grid">
                <div className="traffic-item">
                    <div className="traffic-light">
                        <div className={`light light--red ${!hasDispatched ? 'active' : ''}`}></div>
                        <div className="light light--yellow"></div>
                        <div className={`light light--green ${hasDispatched ? 'active' : ''}`}></div>
                    </div>
                    <div className="traffic-info">
                        <strong>AI Signal Override</strong>
                        <span>{hasDispatched ? 'Priority Routing Active' : 'Standard Timings'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
