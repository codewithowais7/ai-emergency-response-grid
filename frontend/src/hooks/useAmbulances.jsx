import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export default function useAmbulances(socket) {
    const [ambulances, setAmbulances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAmbulances = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE}/ambulances`);
            setAmbulances(res.data.data);
            setError(null);
        } catch (err) {
            setError('Could not fetch ambulance fleet data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAmbulances();
    }, [fetchAmbulances]);

    useEffect(() => {
        if (!socket) return;

        socket.on('ambulance-fleet', (data) => setAmbulances(data));

        socket.on('ambulance-status-changed', (updated) => {
            setAmbulances(prev => prev.map(a => a.id === updated.id ? updated : a));
        });

        socket.on('ambulance-location-updated', (updated) => {
            setAmbulances(prev => prev.map(a => a.id === updated.id ? updated : a));
        });

        return () => {
            socket.off('ambulance-fleet');
            socket.off('ambulance-status-changed');
            socket.off('ambulance-location-updated');
        };
    }, [socket]);

    return { ambulances, loading, error, refetch: fetchAmbulances };
}
