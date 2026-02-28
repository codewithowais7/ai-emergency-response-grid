import { Link } from 'react-router-dom';

export default function NavItem({ to, label, icon, isActive }) {
    return (
        <Link to={to} className={`nav-item ${isActive ? 'nav-item--active' : ''}`}>
            <span className="nav-item__icon">{icon}</span>
            <span className="nav-item__label">{label}</span>
            {isActive && <div className="nav-item__indicator" />}
        </Link>
    );
}
