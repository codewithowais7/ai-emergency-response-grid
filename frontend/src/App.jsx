/**
 * App.js — Root application component.
 *
 * Sets up React Router, initialises the Socket.io hook,
 * and passes shared state (ambulances, alerts, connection status)
 * down to all pages and components.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useSocket from './hooks/useSocket.jsx';
import useAmbulances from './hooks/useAmbulances.jsx';
import useAlerts from './hooks/useAlerts.jsx';

import Header from './components/Header/Header.jsx';
import ConnectionStatus from './components/common/ConnectionStatus.jsx';

import HomePage from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TrackingPage from './pages/TrackingPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
    const { socket, isConnected, isConnecting } = useSocket();
    const { ambulances, loading: ambLoading, error: ambError, refetch: refetchAmb } = useAmbulances(socket);
    const {
        alerts,
        loading: alertLoading,
        error: alertError,
        latestAlert,
        submitAlert,
        dismissLatest,
        refetch: refetchAlerts,
    } = useAlerts(socket);

    const loading = ambLoading || alertLoading;
    const error = ambError || alertError;
    const refetch = () => { refetchAmb(); refetchAlerts(); };

    return (
        <BrowserRouter>
            <Header isConnected={isConnected} isConnecting={isConnecting} />

            <main className="page-content container">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomePage
                                ambulances={ambulances}
                                alerts={alerts}
                                latestAlert={latestAlert}
                                submitAlert={submitAlert}
                                dismissLatest={dismissLatest}
                                loading={loading}
                                error={error}
                                refetch={refetch}
                            />
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <DashboardPage
                                ambulances={ambulances}
                                alerts={alerts}
                                loading={loading}
                                error={error}
                                refetch={refetch}
                            />
                        }
                    />
                    <Route
                        path="/tracking"
                        element={
                            <TrackingPage
                                ambulances={ambulances}
                                alerts={alerts}
                                loading={loading}
                                error={error}
                                refetch={refetch}
                            />
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            {/* Persistent disconnection banner */}
            <ConnectionStatus isConnected={isConnected} />
        </BrowserRouter>
    );
}
