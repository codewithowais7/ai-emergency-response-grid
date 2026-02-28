export default function ConnectionStatus({ isConnected }) {
    if (isConnected) return null;

    return (
        <div className="connection-overlay">
            <div className="connection-banner">
                <span className="connection-banner__icon">📶</span>
                <div className="connection-banner__text">
                    <strong>Backend Offline</strong>
                    <span>Real-time updates and dispatch list disabled. Reconnecting...</span>
                </div>
            </div>
        </div>
    );
}
