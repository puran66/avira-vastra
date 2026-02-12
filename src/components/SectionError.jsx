import '../styles/loaders.css';

/**
 * SectionError - Professional Error Handling with Retry
 */
const SectionError = ({
    title = "Momentary Interruption",
    message = "Our servers are taking a whisper longer than usual to showcase our craft. Please try again.",
    onRetry,
    height
}) => (
    <div className="section-error" style={height ? { minHeight: height } : {}}>
        <div className="section-error__icon">✨</div>
        <h3 className="section-error__title">{title}</h3>
        <p className="section-error__text">{message}</p>
        {onRetry && (
            <button onClick={onRetry} className="section-error__retry">
                Try Re-viewing
            </button>
        )}
    </div>
);

export default SectionError;
