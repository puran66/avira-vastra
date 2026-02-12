import '../styles/loaders.css';

/**
 * SectionLoader - Professional Boutique loading state
 */
const SectionLoader = ({ message = "Curating our finest collections...", height }) => (
    <div className="section-loader" style={height ? { minHeight: height } : {}}>
        <div className="lux-dots">
            <div className="lux-dots__item"></div>
            <div className="lux-dots__item"></div>
            <div className="lux-dots__item"></div>
        </div>
        <p className="section-loader__text">{message}</p>
    </div>
);

export default SectionLoader;
