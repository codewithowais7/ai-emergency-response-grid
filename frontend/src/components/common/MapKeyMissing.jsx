export default function MapKeyMissing() {
    return (
        <div className="map-error-panel glass-panel">
            <span style={{ fontSize: '2rem' }}>🗺️</span>
            <h3>Map Configuration Missing</h3>
            <p>Please add your Google Maps API key to the .env file.</p>
        </div>
    );
}
