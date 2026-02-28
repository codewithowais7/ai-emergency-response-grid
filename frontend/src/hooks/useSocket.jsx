import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || '';

export default function useSocket() {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(true);

    useEffect(() => {
        const s = io(SOCKET_URL, {
            timeout: 10000,
            reconnectionAttempts: Infinity
        });

        s.on('connect', () => {
            console.log('Socket connected');
            setIsConnected(true);
            setIsConnecting(false);
        });

        s.on('disconnect', () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        });

        s.on('connect_error', (err) => {
            console.warn('Socket connect error:', err);
            setIsConnecting(false);
        });

        setSocket(s);

        return () => s.disconnect();
    }, []);

    return { socket, isConnected, isConnecting };
}
