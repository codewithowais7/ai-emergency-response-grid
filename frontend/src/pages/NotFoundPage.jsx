import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The grid coordinates you are looking for do not exist.</p>
            <Link to="/" className="btn btn--primary">
                Return to Command Center
            </Link>
        </div>
    );
}
