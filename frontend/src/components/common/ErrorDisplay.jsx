export default function ErrorDisplay({ title = 'Error', message, onRetry }) {
    return (
        <div className="error-container glass-panel">
            <h3 className="error-title">{title}</h3>
            <p className="error-message">{message}</p>
            {onRetry && (
                <button className="btn btn--primary" onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    );
}
