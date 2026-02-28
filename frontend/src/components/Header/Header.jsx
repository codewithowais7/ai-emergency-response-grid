/**
 * Header.jsx — Premium SaaS-style navigation header.
 */

import { Link, useLocation } from 'react-router-dom';
import NavItem from './NavItem.jsx';
import LiveIndicator from '../Dashboard/LiveIndicator.jsx';

export default function Header({ isConnected, isConnecting }) {
    const location = useLocation();

    return (
        <header className="site-header">
            <div className="container site-header__inner">
                {/* ── Brand ───────────────────────────────────── */}
                <Link to="/" className="site-brand">
                    <div className="site-brand__icon">
                        <span className="site-brand__pulsar" />
                        🚑
                    </div>
                    <div className="site-brand__text">
                        <span className="site-brand__name">AERG</span>
                        <span className="site-brand__tagline">Emergency Response Grid</span>
                    </div>
                </Link>

                {/* ── Navigation ────────────────────────────────── */}
                <nav className="site-nav">
                    <NavItem to="/" label="Command Center" icon="🎮" isActive={location.pathname === '/'} />
                    <NavItem to="/dashboard" label="Hospital Ops" icon="🏥" isActive={location.pathname === '/dashboard'} />
                    <NavItem to="/tracking" label="Live Tracking" icon="📍" isActive={location.pathname === '/tracking'} />
                </nav>

                {/* ── Status ──────────────────────────────────── */}
                <div className="site-header__status">
                    <LiveIndicator />
                    <div className={`connection-pill ${isConnected ? 'connection-pill--online' : 'connection-pill--offline'}`}>
                        {isConnecting ? 'Connecting...' : (isConnected ? 'Online' : 'Offline')}
                    </div>
                </div>
            </div>
            <div className="site-header__border" />
        </header>
    );
}
