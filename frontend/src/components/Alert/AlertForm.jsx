import { useState, useCallback } from 'react';
import EmergencySelect from './EmergencySelect.jsx';

export default function AlertForm({ onSubmit, mapClickCoords }) {
    const [formData, setFormData] = useState({
        type: 'accident',
        description: '',
        latitude: '',
        longitude: ''
    });

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleTypeChange = useCallback((type) => {
        setFormData(prev => ({ ...prev, type }));
    }, []);

    const handleUseMap = useCallback(() => {
        if (mapClickCoords) {
            setFormData(prev => ({
                ...prev,
                latitude: mapClickCoords.lat.toFixed(6),
                longitude: mapClickCoords.lng.toFixed(6)
            }));
        }
    }, [mapClickCoords]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.({
            ...formData,
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude)
        });
        setFormData({ type: 'accident', description: '', latitude: '', longitude: '' });
    };

    return (
        <div className="glass-panel alert-form-container">
            <h2 className="section-title">🚨 Report Emergency</h2>
            <form onSubmit={handleSubmit} className="alert-form">
                <div className="form-group">
                    <label>Emergency Type</label>
                    <EmergencySelect value={formData.type} onChange={handleTypeChange} />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Latitude</label>
                        <input name="latitude" value={formData.latitude} onChange={handleChange} placeholder="e.g. 28.6139" required />
                    </div>
                    <div className="form-group">
                        <label>Longitude</label>
                        <input name="longitude" value={formData.longitude} onChange={handleChange} placeholder="e.g. 77.2090" required />
                    </div>
                </div>

                {mapClickCoords && (
                    <button type="button" className="btn btn--secondary btn--sm" onClick={handleUseMap} style={{ marginBottom: '12px' }}>
                        📍 Use Selected Map Location
                    </button>
                )}

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Details about the emergency..." required />
                </div>

                <button type="submit" className="btn btn--primary btn--block">
                    🚑 Dispatch Emergency
                </button>
            </form>
        </div>
    );
}
