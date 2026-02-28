import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export default function useAlerts(socket) {
    const [alerts, setAlerts] = useState([]);
    const [latestAlert, setLatestAlert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAlerts = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE}/emergencies`);
            setAlerts(res.data.data);
            setError(null);
        } catch (err) {
            setError('Could not load alert history.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const submitAlert = useCallback(async (alertData) => {
        try {
            await axios.post(`${API_BASE}/emergencies`, alertData);
        } catch (err) {
            console.error('Failed to submit alert:', err);
            // In production, show a toast here
        }
    }, []);

    const dismissLatest = useCallback(() => setLatestAlert(null), []);

    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);

    useEffect(() => {
        if (!socket) return;

        socket.on('new-alert', (alert) => {
            setAlerts(prev => [alert, ...prev]);
            setLatestAlert(alert);
        });

        return () => socket.off('new-alert');
    }, [socket]);

    return { alerts, latestAlert, loading, error, submitAlert, dismissLatest, refetch: fetchAlerts };
}
